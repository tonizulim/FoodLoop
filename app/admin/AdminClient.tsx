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

import { deleteUser, type User } from "@/lib/server-actions/user";

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
                      <CardTitle className="text-lg">{user.email}</CardTitle>
                    </div>
                    <CardDescription>User ID: {user.id}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={async () => {
                        await deleteUser(user.id);
                        reload();
                      }}
                    >
                      <Shield className="h-4 w-4" />
                      Delete
                    </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {data.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No users found</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
