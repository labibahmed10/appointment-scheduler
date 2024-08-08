import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React from 'react';

const AllUsers = () => {
    return (
        <div>
             <h2 className="text-2xl font-bold mb-6">Find Users</h2>
          <div className="bg-card p-6 rounded-md shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <Input placeholder="Search users..." className="flex-1" />
              <Button>Search</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">John Doe</div>
                      <div className="text-muted-foreground">@johndoe</div>
                    </div>
                  </div>
                  <Button className="w-full">Schedule Appointment</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                      <AvatarFallback>JA</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">Jane Appleseed</div>
                      <div className="text-muted-foreground">@janeappleseed</div>
                    </div>
                  </div>
                  <Button className="w-full">Schedule Appointment</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">Sarah Myles</div>
                      <div className="text-muted-foreground">@sarahmyles</div>
                    </div>
                  </div>
                  <Button className="w-full">Schedule Appointment</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
    );
};

export default AllUsers;