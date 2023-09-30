import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserTypes } from "@/types/types";

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
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    city: "",
  });

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    setUserDetails({
      name: user?.name || "",
      email: user?.email || "",
      city: user?.address.city || "",
    });
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
  };

  const handleUpdateUser = () => {
    const edited = users?.map((user: UserTypes) => {
      if (user.id === userId) {
        return {
          ...user,
          name: userDetails.name,
          email: userDetails.email,
          address: { ...user.address, city: userDetails.city },
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
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Name"
              value={userDetails.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={userDetails.email}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="city">City</Label>
            <Input
              type="text"
              id="city"
              placeholder="City"
              value={userDetails.city}
              onChange={handleInputChange}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdateUser}>
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditUser;
