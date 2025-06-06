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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react"
import AccountNav from "@/components/account-nav"

// Mock address data - would be fetched from an API
const addresses = [
  {
    id: "addr-1",
    type: "shipping",
    default: true,
    name: "Sarah Johnson",
    street: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    country: "United States",
    phone: "(555) 123-4567",
  },
  {
    id: "addr-2",
    type: "billing",
    default: true,
    name: "Sarah Johnson",
    street: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    country: "United States",
    phone: "(555) 123-4567",
  },
]

export default function AddressesPage() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<any>(null)

  const handleEditAddress = (address: any) => {
    setSelectedAddress(address)
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
              <h1 className="text-2xl font-bold">Addresses</h1>
              <p className="text-muted-foreground">Manage your shipping and billing addresses</p>
            </div>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Addresses</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {addresses.length > 0 ? (
                  addresses.map((address) => (
                    <Card key={address.id}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{address.name}</CardTitle>
                            <CardDescription>
                              {address.type.charAt(0).toUpperCase() + address.type.slice(1)} Address
                              {address.default && " (Default)"}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditAddress(address)}>
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
                        <div className="text-sm space-y-1">
                          <p>{address.street}</p>
                          <p>
                            {address.city}, {address.state} {address.zip}
                          </p>
                          <p>{address.country}</p>
                          <p className="pt-1">{address.phone}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        {!address.default && (
                          <Button variant="outline" size="sm" className="w-full">
                            Set as Default {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="md:col-span-2 flex flex-col items-center justify-center py-12 border rounded-lg border-dashed">
                    <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">No addresses saved</h3>
                    <p className="text-muted-foreground mb-4">Add an address to make checkout faster</p>
                    <Button onClick={() => setShowAddDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Address
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {addresses.filter((a) => a.type === "shipping").length > 0 ? (
                  addresses
                    .filter((a) => a.type === "shipping")
                    .map((address) => (
                      <Card key={address.id}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{address.name}</CardTitle>
                              <CardDescription>
                                Shipping Address
                                {address.default && " (Default)"}
                              </CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditAddress(address)}>
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
                          <div className="text-sm space-y-1">
                            <p>{address.street}</p>
                            <p>
                              {address.city}, {address.state} {address.zip}
                            </p>
                            <p>{address.country}</p>
                            <p className="pt-1">{address.phone}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4">
                          {!address.default && (
                            <Button variant="outline" size="sm" className="w-full">
                              Set as Default Shipping
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="md:col-span-2 flex flex-col items-center justify-center py-12 border rounded-lg border-dashed">
                    <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">No shipping addresses saved</h3>
                    <p className="text-muted-foreground mb-4">Add a shipping address to make checkout faster</p>
                    <Button onClick={() => setShowAddDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Shipping Address
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="billing" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {addresses.filter((a) => a.type === "billing").length > 0 ? (
                  addresses
                    .filter((a) => a.type === "billing")
                    .map((address) => (
                      <Card key={address.id}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{address.name}</CardTitle>
                              <CardDescription>
                                Billing Address
                                {address.default && " (Default)"}
                              </CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditAddress(address)}>
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
                          <div className="text-sm space-y-1">
                            <p>{address.street}</p>
                            <p>
                              {address.city}, {address.state} {address.zip}
                            </p>
                            <p>{address.country}</p>
                            <p className="pt-1">{address.phone}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4">
                          {!address.default && (
                            <Button variant="outline" size="sm" className="w-full">
                              Set as Default Billing
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="md:col-span-2 flex flex-col items-center justify-center py-12 border rounded-lg border-dashed">
                    <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">No billing addresses saved</h3>
                    <p className="text-muted-foreground mb-4">Add a billing address to make checkout faster</p>
                    <Button onClick={() => setShowAddDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Billing Address
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Add Address Dialog */}
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
                <DialogDescription>Add a new shipping or billing address to your account.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="address-type">Address Type</Label>
                    <Select defaultValue="shipping">
                      <SelectTrigger id="address-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shipping">Shipping</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="both">Both Shipping & Billing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" placeholder="Full name" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="street-address">Street Address</Label>
                    <Input id="street-address" placeholder="Street address" />
                  </div>
                  <div className="col-span-1">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" />
                  </div>
                  <div className="col-span-1">
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" placeholder="State/Province" />
                  </div>
                  <div className="col-span-1">
                    <Label htmlFor="zip">ZIP/Postal Code</Label>
                    <Input id="zip" placeholder="ZIP/Postal code" />
                  </div>
                  <div className="col-span-1">
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="us">
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Phone number" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddDialog(false)}>Save Address</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit Address Dialog */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Edit Address</DialogTitle>
                <DialogDescription>Update your address information.</DialogDescription>
              </DialogHeader>
              {selectedAddress && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="edit-address-type">Address Type</Label>
                      <Select defaultValue={selectedAddress.type}>
                        <SelectTrigger id="edit-address-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shipping">Shipping</SelectItem>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="both">Both Shipping & Billing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="edit-full-name">Full Name</Label>
                      <Input id="edit-full-name" defaultValue={selectedAddress.name} />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="edit-street-address">Street Address</Label>
                      <Input id="edit-street-address" defaultValue={selectedAddress.street} />
                    </div>
                    <div className="col-span-1">
                      <Label htmlFor="edit-city">City</Label>
                      <Input id="edit-city" defaultValue={selectedAddress.city} />
                    </div>
                    <div className="col-span-1">
                      <Label htmlFor="edit-state">State/Province</Label>
                      <Input id="edit-state" defaultValue={selectedAddress.state} />
                    </div>
                    <div className="col-span-1">
                      <Label htmlFor="edit-zip">ZIP/Postal Code</Label>
                      <Input id="edit-zip" defaultValue={selectedAddress.zip} />
                    </div>
                    <div className="col-span-1">
                      <Label htmlFor="edit-country">Country</Label>
                      <Select defaultValue="us">
                        <SelectTrigger id="edit-country">
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="edit-phone">Phone Number</Label>
                      <Input id="edit-phone" defaultValue={selectedAddress.phone} />
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowEditDialog(false)}>Update Address</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

