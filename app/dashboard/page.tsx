import {
  ArrowUpIcon,
  ArrowDownIcon,
  Thermometer,
  Package,
  Truck,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

// Helper function to determine progress bar color based on capacity
function getCapacityColorClass(capacity: number, type: "cold" | "general") {
  const baseClass = type === "cold" ? "progress-bar-cold" : "progress-bar-general"

  if (capacity >= 90) return "progress-bar-danger"
  if (capacity >= 75) return "progress-bar-warning"
  return baseClass
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">548</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cold Storage Items</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">183</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              <span>8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Deliveries Pending</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center pt-1 text-xs text-red-500">
              <ArrowDownIcon className="mr-1 h-3 w-3" />
              <span>3% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage Facilities */}
      <Tabs defaultValue="facilities" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="facilities">Storage Facilities</TabsTrigger>
            <TabsTrigger value="recent">Recent Inventory</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="facilities" className="space-y-4">
          {/* Nakuru */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <h3 className="font-semibold">Nakuru</h3>
                  <span className="text-xs text-muted-foreground bg-muted-foreground/20 px-2 py-0.5 rounded-full">
                    2 storages
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 p-4">
              {/* Nakuru Cold Storage */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Thermometer className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Nakuru Cold Storage A</CardTitle>
                        <CardDescription>Nakuru Industrial Area</CardDescription>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Cold Storage
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Capacity</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="progress-bar">
                      <div className={`h-full ${getCapacityColorClass(65, "cold")}`} style={{ width: "65%" }}></div>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-2">
                      <span className="text-muted-foreground">Items</span>
                      <span className="font-medium">78</span>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full flex items-center justify-center mt-2">
                      <span>View Details</span>
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Nakuru General Storage */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Package className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Nakuru General Storage</CardTitle>
                        <CardDescription>Nakuru East</CardDescription>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      General Storage
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Capacity</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="progress-bar">
                      <div className={`h-full ${getCapacityColorClass(45, "general")}`} style={{ width: "45%" }}></div>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-2">
                      <span className="text-muted-foreground">Items</span>
                      <span className="font-medium">124</span>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full flex items-center justify-center mt-2">
                      <span>View Details</span>
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Nairobi */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <h3 className="font-semibold">Nairobi</h3>
                  <span className="text-xs text-muted-foreground bg-muted-foreground/20 px-2 py-0.5 rounded-full">
                    3 storages
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 p-4">
              {/* Nairobi Cold Storage */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Thermometer className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Nairobi Cold Storage</CardTitle>
                        <CardDescription>Industrial Area</CardDescription>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Cold Storage
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Capacity</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="progress-bar">
                      <div className={`h-full ${getCapacityColorClass(85, "cold")}`} style={{ width: "85%" }}></div>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-2">
                      <span className="text-muted-foreground">Items</span>
                      <span className="font-medium">105</span>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full flex items-center justify-center mt-2">
                      <span>View Details</span>
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Nairobi General Storage A */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Package className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Nairobi General Storage A</CardTitle>
                        <CardDescription>Westlands</CardDescription>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      General Storage
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Capacity</span>
                      <span className="font-medium">50%</span>
                    </div>
                    <div className="progress-bar">
                      <div className={`h-full ${getCapacityColorClass(50, "general")}`} style={{ width: "50%" }}></div>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-2">
                      <span className="text-muted-foreground">Items</span>
                      <span className="font-medium">93</span>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full flex items-center justify-center mt-2">
                      <span>View Details</span>
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Nairobi General Storage B */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Package className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Nairobi General Storage B</CardTitle>
                        <CardDescription>Karen</CardDescription>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      General Storage
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Capacity</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="progress-bar">
                      <div className={`h-full ${getCapacityColorClass(30, "general")}`} style={{ width: "30%" }}></div>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-2">
                      <span className="text-muted-foreground">Items</span>
                      <span className="font-medium">62</span>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full flex items-center justify-center mt-2">
                      <span>View Details</span>
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mombasa */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <h3 className="font-semibold">Mombasa</h3>
                  <span className="text-xs text-muted-foreground bg-muted-foreground/20 px-2 py-0.5 rounded-full">
                    2 storages
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Inventory</CardTitle>
              <CardDescription>Latest items added to your inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Tomatoes</p>
                      <p className="text-sm text-muted-foreground">Added to Nakuru Cold Storage A</p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">2 hours ago</div>
                  </div>

                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Potatoes</p>
                      <p className="text-sm text-muted-foreground">Added to Nairobi General Storage A</p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">5 hours ago</div>
                  </div>

                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Onions</p>
                      <p className="text-sm text-muted-foreground">Added to Nakuru General Storage</p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">Yesterday</div>
                  </div>

                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Cabbage</p>
                      <p className="text-sm text-muted-foreground">Added to Nairobi Cold Storage</p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">Yesterday</div>
                  </div>

                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Carrots</p>
                      <p className="text-sm text-muted-foreground">Added to Nairobi Cold Storage</p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">2 days ago</div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  View All Inventory
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Storage Utilization Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Utilization</CardTitle>
          <CardDescription>Overall storage capacity usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm font-medium">Cold Storage</span>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
              <div className="progress-bar">
                <div className="h-full progress-bar-cold" style={{ width: "75%" }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-medium">General Storage</span>
                </div>
                <span className="text-sm font-medium">42%</span>
              </div>
              <div className="progress-bar">
                <div className="h-full progress-bar-general" style={{ width: "42%" }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-gray-500 mr-2"></div>
                  <span className="text-sm font-medium">Overall</span>
                </div>
                <span className="text-sm font-medium">58%</span>
              </div>
              <div className="progress-bar">
                <div className="h-full bg-gray-500" style={{ width: "58%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

