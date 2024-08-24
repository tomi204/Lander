import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Video, Phone, LayoutGrid, CheckCircle, HourglassIcon, FileCheck, Rocket, ChevronUp } from "lucide-react"

export default function Component() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-full max-w-xs border-r hidden md:flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          {/* Conversation list items */}
          {[
            { name: "Micha Shalev", role: "Junior web analyst | Google ...", initials: "MS" },
            { name: "Brycen C. EC I...", role: "Creative Writing and Data G...", initials: "BC" },
            { name: "Leandro Conti", role: "You: nice, de una broo!!", initials: "LC" },
            { name: "Joel Kraus", role: "Google analytics report setup", initials: "JK" },
            { name: "Jimmy Jun", role: "Website Revamp Week One ...", initials: "JJ" },
          ].map((item, i) => (
            <div key={i} className="flex items-center p-4 hover:bg-muted cursor-pointer">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`/placeholder.svg?text=${item.initials}`} />
                <AvatarFallback>{item.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`/placeholder.svg?text=JK`} />
              <AvatarFallback>JK</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Joel Kraus</h2>
              <p className="text-sm text-muted-foreground">Google analytics report setup</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LayoutGrid className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Chat messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <div className="flex items-start">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={`/placeholder.svg?text=JK`} />
                <AvatarFallback>JK</AvatarFallback>
              </Avatar>
              <div className="bg-primary text-primary-foreground rounded-lg p-2 max-w-[80%]">
                <p>Let's do Monday the 8th 1:40 EDT. let me know if that works.</p>
              </div>
            </div>
            <div className="flex items-start justify-end">
              <div className="bg-muted rounded-lg p-2 max-w-[80%]">
                <p>Hi, Joel! That works fine for me. Thanks!</p>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Message input */}
        <div className="p-4 border-t">
          <Input placeholder="Send a message..." />
        </div>
      </div>

      {/* Right sidebar (hidden on mobile) */}
      <div className="w-64 border-l hidden lg:block bg-muted/40">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Joel Kraus</h3>
          <p className="text-sm text-muted-foreground">9:34 AM EDT (1 h behind)</p>
        </div>
        <div className="p-4">
          <Button variant="outline" className="w-full">View proposal</Button>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold flex items-center">
              <span className="mr-2">Activity timeline</span>
              <ChevronUp className="h-4 w-4" />
            </h4>
          </div>
          <div className="space-y-4 relative before:absolute before:left-1.5 before:top-1 before:bottom-1 before:w-[1px] before:bg-muted-foreground/20">
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 mr-3 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">Proposal submitted</p>
                <p className="text-xs text-muted-foreground">June 24</p>
              </div>
            </div>
            <div className="flex items-start">
              <HourglassIcon className="w-4 h-4 mr-3 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">Contract offer</p>
                <p className="text-xs text-muted-foreground">Awaiting offer from client</p>
              </div>
            </div>
            <div className="flex items-start">
              <FileCheck className="w-4 h-4 mr-3 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Accept contract</p>
              </div>
            </div>
            <div className="flex items-start">
              <Rocket className="w-4 h-4 mr-3 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Contract starts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}