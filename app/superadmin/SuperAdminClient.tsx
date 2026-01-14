"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle2,
  UserCheck,
  UserX,
  Crown,
  Trash2,
} from "lucide-react";
import {
  approveUser,
  deleteUser,
  promoteUserToAdmin,
  revokeApproval,
} from "@/lib/server-actions/user";

interface User {
  id: number;
  email: string;
  approved: boolean;
  isAdmin: boolean;
}

interface Props {
  currentUser: {
    id: number;
    email: string;
    isAdmin: boolean;
  };
  users: User[];
}

export default function SuperAdminClient({ currentUser, users }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(false);
  }, []);


  if (loading) return null;

  const reload = () => location.reload();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-secondary/30 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Crown className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Super Admin Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage all users, approvals, and platform admins
          </p>
        </div>

        {success && (
          <Alert className="mb-6 border-primary bg-primary/10">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <AlertDescription className="text-primary">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{user.email}</CardTitle>

                      {user.isAdmin && (
                        <Badge className="gap-1">
                          <Crown className="h-3 w-3" />
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

                    <CardDescription>User ID: {user.id}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {!user.approved && !user.isAdmin && (
                    <Button
                      size="sm"
                      className="gap-2"
                      onClick={async () => {
                        await approveUser(user.id.toString());
                        reload();
                      }}
                    >
                      <UserCheck className="h-4 w-4" />
                      Approve
                    </Button>
                  )}

                  {user.approved && !user.isAdmin && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={async() => {
                        await revokeApproval(user.id.toString());
                        reload();
                      }}
                    >
                      <UserX className="h-4 w-4" />
                      Revoke Approval
                    </Button>
                  )}

                  {!user.isAdmin && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={async () => {
                        await promoteUserToAdmin(user.id.toString());
                        reload();
                      }}
                    >
                      <Crown className="h-4 w-4" />
                      Promote to Admin
                    </Button>
                  )}

                  {user.id !== currentUser.id && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="gap-2"
                      onClick={async () => {
                        await deleteUser(user.id.toString());
                        reload();
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {users.length === 0 && (
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
