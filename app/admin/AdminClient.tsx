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
import { Shield } from "lucide-react";

import { deleteUser, type User } from "@/lib/server-actions/user";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminClient({ users }: { users: User[] }) {
  const [data] = useState(users);
  const [deleting, setDeleting] = useState<User | null>(null); // stanje za potvrdu brisanja
  const router = useRouter();

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
            <Card key={user.adminId}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{user.email}</CardTitle>
                    </div>
                    <CardDescription>User ID: {user.adminId}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {/* Dugme za brisanje otvara dialog */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2"
                    onClick={() => setDeleting(user)}
                  >
                    <Shield className="h-4 w-4" />
                    Delete
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push(`/user/${user.adminId}`)}
                  >
                    Edit
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

      {/* --- Dialog za potvrdu brisanja --- */}
      <Dialog open={!!deleting} onOpenChange={() => setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="py-2">
            Are you sure you want to delete user{" "}
            <strong>{deleting?.email}</strong>? This action cannot be undone.
          </p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                if (!deleting) return;
                await deleteUser(deleting.adminId);
                setDeleting(null);
                reload();
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
