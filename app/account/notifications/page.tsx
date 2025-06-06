"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Package, Tag, CreditCard, Megaphone } from "lucide-react"
import AccountNav from "@/components/account-nav"

export default function NotificationsPage() {
  const [emailPreferences, setEmailPreferences] = useState({
    orders: true,
    promotions: true,
    productUpdates: false,
    newsletter: true,
    accountUpdates: true,
  })

  const [pushPreferences, setPushPreferences] = useState({
    orders: true,
    promotions: false,
    productUpdates: false,
    accountUpdates: true,
  })

  const handleEmailToggle = (key: keyof typeof emailPreferences) => {
    setEmailPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handlePushToggle = (key: keyof typeof pushPreferences) => {
    setPushPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/4">
          <AccountNav />
        </div>

        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Notification Preferences</h1>
            <p className="text-muted-foreground">Manage how you receive notifications</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-brand-purple" />
                  Email Notifications
                </CardTitle>
                <CardDescription>Manage the emails you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="email-orders" className="flex-1">
                      <span className="font-medium">Order Updates</span>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about your orders, shipping, and delivery
                      </p>
                    </Label>
                  </div>
                  <Switch
                    id="email-orders"
                    checked={emailPreferences.orders}
                    onCheckedChange={() => handleEmailToggle("orders")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="email-promotions" className="flex-1">
                      <span className="font-medium">Promotions & Discounts</span>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about sales, special offers, and discounts
                      </p>
                    </Label>
                  </div>
                  <Switch
                    id="email-promotions"
                    checked={emailPreferences.promotions}
                    onCheckedChange={() => handleEmailToggle("promotions")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="email-product-updates" className="flex-1">
                      <span className="font-medium">Product Updates</span>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about new products and product updates
                      </p>
                    </Label>
                  </div>
                  <Switch
                    id="email-product-updates"
                    checked={emailPreferences.productUpdates}
                    onCheckedChange={() => handleEmailToggle("productUpdates")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Megaphone className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="email-newsletter" className="flex-1">
                      <span className="font-medium">Newsletter</span>
                      <p className="text-sm text-muted-foreground">
                        Receive our monthly newsletter with tips and inspiration
                      </p>
                    </Label>
                  </div>
                  <Switch
                    id="email-newsletter"
                    checked={emailPreferences.newsletter}
                    onCheckedChange={() => handleEmailToggle("newsletter")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="email-account-updates" className="flex-1">
                      <span className="font-medium">Account Updates</span>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about your account, payment methods, and security
                      </p>
                    </Label>
                  </div>
                  <Switch
                    id="email-account-updates"
                    checked={emailPreferences.accountUpdates}
                    onCheckedChange={() => handleEmailToggle("accountUpdates")}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-brand-purple" />
                  Push Notifications
                </CardTitle>
                <CardDescription>Manage the push notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="push-orders" className="flex-1">
                      <span className="font-medium">Order Updates</span>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about your orders, shipping, and delivery
                      </p>
                    </Label>
                  </div>
                  <Switch
                    id="push-orders"
                    checked={pushPreferences.orders}
                    onCheckedChange={() => handlePushToggle("orders")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="push-promotions" className="flex-1">
                      <span className="font-medium">Promotions & Discounts</span>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about sales, special offers, and discounts
                      </p>
                    </Label>
                  </div>
                  <Switch
                    id="push-promotions"
                    checked={pushPreferences.promotions}
                    onCheckedChange={() => handlePushToggle("promotions")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="push-product-updates" className="flex-1">
                      <span className="font-medium">Product Updates</span>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about new products and product updates
                      </p>
                    </Label>
                  </div>
                  <Switch
                    id="push-product-updates"
                    checked={pushPreferences.productUpdates}
                    onCheckedChange={() => handlePushToggle("productUpdates")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="push-account-updates" className="flex-1">
                      <span className="font-medium">Account Updates</span>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about your account, payment methods, and security
                      </p>
                    </Label>
                  </div>
                  <Switch
                    id="push-account-updates"
                    checked={pushPreferences.accountUpdates}
                    onCheckedChange={() => handlePushToggle("accountUpdates")}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="bg-brand-purple hover:bg-brand-lavender">Save Preferences</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

