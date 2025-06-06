"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Plus, Pencil, Trash2 } from "lucide-react"
import AccountNav from "@/components/account-nav"

// Mock payment methods - would be fetched from an API
const paymentMethods = [
  {
    id: "pm-1",
    type: "credit_card",
    default: true,
    brand: "Visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
    name: "Sarah Johnson",
  },
]

export default function PaymentMethodsPage() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null)

  const handleEditPaymentMethod = (paymentMethod: any) => {
    setSelectedPaymentMethod(paymentMethod)
    setShowEditDialog(true)
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/4">
          <AccountNav />
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">Payment Methods</h1>
              <p className="text-muted-foreground">Manage your saved payment methods</p>
            </div>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {paymentMethods.length > 0 ? (
              paymentMethods.map((method) => (
                <Card key={method.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {method.brand} •••• {method.last4}
                        </CardTitle>
                        <CardDescription>
                          Expires {method.expMonth}/{method.expYear}
                          {method.default && " (Default)"}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditPaymentMethod(method)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p>{method.name}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    {!method.default && (
                      <Button variant="outline" size="sm" className="w-full">
                        Set as Default
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="md:col-span-2 flex flex-col items-center justify-center py-12 border rounded-lg border-dashed">
                <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No payment methods saved</h3>
                <p className="text-muted-foreground mb-4">Add a payment method to make checkout faster</p>
                <Button onClick={() => setShowAddDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </div>
            )}
          </div>

          {/* Add Payment Method Dialog */}
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
                <DialogDescription>Add a new credit or debit card to your account.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input id="card-name" placeholder="Name as it appears on card" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="•••• •••• •••• ••••" />
                  </div>
                  <div className="col-span-1">
                    <Label htmlFor="expiry">Expiration Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="col-span-1">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="CVC" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="billing-address">Billing Address</Label>
                    <Select defaultValue="existing">
                      <SelectTrigger id="billing-address">
                        <SelectValue placeholder="Select billing address" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="existing">Use Existing Address</SelectItem>
                        <SelectItem value="new">Add New Address</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddDialog(false)}>Save Payment Method</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit Payment Method Dialog */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Edit Payment Method</DialogTitle>
                <DialogDescription>Update your payment method information.</DialogDescription>
              </DialogHeader>
              {selectedPaymentMethod && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="edit-card-name">Name on Card</Label>
                      <Input id="edit-card-name" defaultValue={selectedPaymentMethod.name} />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="edit-card-number">Card Number</Label>
                      <Input
                        id="edit-card-number"
                        defaultValue={`•••• •••• •••• ${selectedPaymentMethod.last4}`}
                        disabled
                      />
                    </div>
                    <div className="col-span-1">
                      <Label htmlFor="edit-expiry">Expiration Date</Label>
                      <Input
                        id="edit-expiry"
                        defaultValue={`${selectedPaymentMethod.expMonth}/${selectedPaymentMethod.expYear}`}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="edit-billing-address">Billing Address</Label>
                      <Select defaultValue="existing">
                        <SelectTrigger id="edit-billing-address">
                          <SelectValue placeholder="Select billing address" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="existing">Use Existing Address</SelectItem>
                          <SelectItem value="new">Add New Address</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowEditDialog(false)}>Update Payment Method</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

