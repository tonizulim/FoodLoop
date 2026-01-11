"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, UserCheck, UserX } from "lucide-react";

import {
  approveUser,
  makeAdmin,
  type User,
} from "@/lib/adminActions";

export default function AdminClient({ users }: { users: User[] }) {
  const [data] = useState(users);

  const reload = () => location.reload();

  return (
    <div className="min-h-screen bg-secondary/30 py-10">
      <div className="container mx-auto max-w-5xl px-4 space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage users and permissions
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {data.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">
                        {user.email}
                      </CardTitle>

                      {user.isAdmin && (
                        <Badge className="gap-1">
                          <Shield className="h-3 w-3" />
                          Admin
                        </Badge>
                      )}

                      {user.approved ? (
                        <Badge className="bg-green-600 hover:bg-green-700 gap-1">
                          <UserCheck className="h-3 w-3" />
                          Approved
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <UserX className="h-3 w-3" />
                          Pending
                        </Badge>
                      )}
                    </div>

                    <CardDescription>
                      User ID: {user.id}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {!user.approved && (
                    <Button
                      size="sm"
                      className="gap-2"
                      onClick={async () => {
                        await approveUser("3");
                        reload();
                      }}
                    >
                      <UserCheck className="h-4 w-4" />
                      Approve
                    </Button>
                  )}

                  {!user.isAdmin && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={async () => {
                        await makeAdmin(user.id);
                        reload();
                      }}
                    >
                      <Shield className="h-4 w-4" />
                      Make admin
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {data.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No users found
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
