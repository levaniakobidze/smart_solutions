import React, { Dispatch, FC, SetStateAction, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { UserTypes } from "@/types/types";

interface PropTyeps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userId: number;
  users: UserTypes[];
  setUsers: Dispatch<SetStateAction<UserTypes[]>>;
}

const DeleteUser: FC<PropTyeps> = ({
  isOpen,
  setIsOpen,
  users,
  setUsers,
  userId,
}) => {
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleDeleteUser = () => {
    const deleted = users.filter((user: UserTypes) => user.id !== userId);
    setUsers(deleted);
    handleClose();
  };

  return (
    <div onClick={handleClose}>
      <AlertDialog open={isOpen}>
        <AlertDialogTrigger
          asChild
          onPointerDown={handleOpen}
        ></AlertDialogTrigger>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: "red" }}>
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              user data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              style={{ backgroundColor: "red" }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteUser;
