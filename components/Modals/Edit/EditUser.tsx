import React, { Dispatch, FC, SetStateAction } from "react";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserTypes } from "@/types/types";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface PropTyeps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userId: number;
  users: UserTypes[];
  setUsers: Dispatch<SetStateAction<UserTypes[]>>;
}
let toastObj = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const EditUser: FC<PropTyeps> = ({
  isOpen,
  setIsOpen,
  users,
  setUsers,
  userId,
}) => {
  const user = users?.find((user: UserTypes) => user.id === userId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  // Function to submit editted user form
  const onSubmit = () => {
    const edited = users?.map((user: UserTypes) => {
      if (user.id === userId) {
        return {
          ...user,
          name: getValues("name"),
          email: getValues("email"),
          address: { ...user.address, city: getValues("city") },
        };
      }
      return user;
    });
    setUsers(edited);
    toast.success(`User successfully Edited!`, {
      ...toastObj,
    });
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
            <AlertDialogTitle>Edit User</AlertDialogTitle>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("name", {
                  required: "Name is required!",
                })}
                className="mt-2"
                type="text"
                id="name"
                placeholder="Name"
                defaultValue={user?.name}
              />
              {errors.name && (
                <p className="text-red-500">{`${errors.name.message}`}</p>
              )}
            </div>
            <div className="mt-5 grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", {
                  required: "Email is required!",
                })}
                className="mt-2"
                type="email"
                id="email"
                placeholder="Email"
                defaultValue={user?.email}
              />
              {errors.email && (
                <p className="text-red-500">{`${errors.email.message}`}</p>
              )}
            </div>
            <div className="mt-5 grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="city">City</Label>
              <Input
                {...register("city", {
                  required: "City is required!",
                })}
                className="mt-2"
                type="text"
                id="city"
                placeholder="City"
                defaultValue={user?.address.city}
              />
              {errors.city && (
                <p className="text-red-500">{`${errors.city.message}`}</p>
              )}
            </div>
            <div className="mt-10">
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleClose}>
                  Cancel
                </AlertDialogCancel>
                <Button type="submit">Update</Button>
              </AlertDialogFooter>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditUser;
