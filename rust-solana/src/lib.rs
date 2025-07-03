use anyhow::Result;
use solana_client::rpc_client::RpcClient;
use solana_sdk::{
    commitment_config::CommitmentConfig,
    pubkey::Pubkey,
    signature::Signature,
    system_instruction,
    transaction::Transaction,
    signer::Signer,
};
use serde::{Deserialize, Serialize};
use std::str::FromStr;

#[derive(Debug, Serialize, Deserialize)]
pub struct PaymentRequest {
    pub amount_lamports: u64,
    pub recipient: String,
    pub payer: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PaymentResponse {
    pub signature: String,
    pub success: bool,
    pub message: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TransactionStatus {
    pub signature: String,
    pub confirmed: bool,
    pub finalized: bool,
    pub error: Option<String>,
}

pub struct SolanaPaymentProcessor {
    client: RpcClient,
    network: String,
}

impl SolanaPaymentProcessor {
    pub fn new(rpc_url: &str, network: &str) -> Self {
        let client = RpcClient::new_with_commitment(
            rpc_url.to_string(),
            CommitmentConfig::confirmed(),
        );
        
        Self {
            client,
            network: network.to_string(),
        }
    }

    pub async fn create_payment_transaction(
        &self,
        amount_lamports: u64,
        recipient_pubkey: &str,
        payer_pubkey: &str,
    ) -> Result<String> {
        let recipient = Pubkey::from_str(recipient_pubkey)?;
        let payer = Pubkey::from_str(payer_pubkey)?;

        let instruction = system_instruction::transfer(&payer, &recipient, amount_lamports);
        
        let recent_blockhash = self.client.get_latest_blockhash()?;
        let transaction = Transaction::new_with_payer(&[instruction], Some(&payer));
        
        // Return the serialized transaction for the frontend to sign
        let serialized = bincode::serialize(&transaction)?;
        Ok(base64::encode(serialized))
    }

    pub async fn verify_transaction(&self, signature: &str) -> Result<TransactionStatus> {
        let sig = Signature::from_str(signature)?;
        
        match self.client.get_signature_status(&sig)? {
            Some(Ok(_)) => {
                // Transaction was successful
                let finalized = self.client
                    .get_signature_status_with_commitment(&sig, CommitmentConfig::finalized())?
                    .is_some();
                
                Ok(TransactionStatus {
                    signature: signature.to_string(),
                    confirmed: true,
                    finalized,
                    error: None,
                })
            }
            Some(Err(e)) => {
                // Transaction failed
                Ok(TransactionStatus {
                    signature: signature.to_string(),
                    confirmed: true,
                    finalized: false,
                    error: Some(e.to_string()),
                })
            }
            None => {
                // Transaction not found or not confirmed yet
                Ok(TransactionStatus {
                    signature: signature.to_string(),
                    confirmed: false,
                    finalized: false,
                    error: None,
                })
            }
        }
    }

    pub async fn get_balance(&self, pubkey: &str) -> Result<u64> {
        let pubkey = Pubkey::from_str(pubkey)?;
        let balance = self.client.get_balance(&pubkey)?;
        Ok(balance)
    }

    pub fn lamports_to_sol(lamports: u64) -> f64 {
        lamports as f64 / 1_000_000_000.0
    }

    pub fn sol_to_lamports(sol: f64) -> u64 {
        (sol * 1_000_000_000.0) as u64
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_payment_processor() {
        let processor = SolanaPaymentProcessor::new(
            "https://api.devnet.solana.com",
            "devnet"
        );
        
        // Test conversion functions
        assert_eq!(SolanaPaymentProcessor::sol_to_lamports(1.0), 1_000_000_000);
        assert_eq!(SolanaPaymentProcessor::lamports_to_sol(1_000_000_000), 1.0);
    }
}
