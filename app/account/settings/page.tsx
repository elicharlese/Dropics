"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { User, Lock, AlertTriangle } from "lucide-react"
import AccountNav from "@/components/account-nav"

export default function SettingsPage() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Mock user data - would be fetched from an API
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/4">
          <AccountNav />
        </div>

        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5 text-brand-purple" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue={user.phone} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button className="bg-brand-purple hover:bg-brand-lavender">Save Changes</Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Delete Account
                  </CardTitle>
                  <CardDescription>Permanently delete your account and all associated data</CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      This action cannot be undone. All your data will be permanently removed.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                    Delete Account
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="mr-2 h-5 w-5 text-brand-purple" />
                    Change Password
                  </CardTitle>
                  <CardDescription>Update your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button className="bg-brand-purple hover:bg-brand-lavender">Update Password</Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="mr-2 h-5 w-5 text-brand-purple" />
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Protect your account with an additional security layer
                      </p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Delete Account Confirmation Dialog */}
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. All your data will be permanently deleted.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground">
                  Please type <span className="font-semibold">delete my account</span> to confirm.
                </p>
                <Input className="mt-2" placeholder="delete my account" />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                  Cancel
                </Button>
                <Button variant="destructive">Delete Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

