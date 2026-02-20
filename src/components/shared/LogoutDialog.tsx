"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function LogoutDialog() {
  const router = useRouter();

  const handleConfirm = async () => {
    // await signOut(); // your logout logic
    router.push("/login");
  };

  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger asChild>
        <button className="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-nav-text hover:bg-[#162036] hover:text-nav-text-active transition-all duration-150 w-full">
          <LogOut className="shrink-0 w-4.5 h-4.5 text-[#4e6a8f] group-hover:text-[#8ba0c0]" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="sm:max-w-md rounded-2xl p-6 flex flex-col gap-5">
        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 mx-auto">
          <LogOut className="w-7 h-7 text-red-500" />
        </div>

        {/* Text */}
        <DialogHeader className="text-center gap-1.5">
          <DialogTitle className="text-base font-bold text-gray-900">
            Log out
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-400">
            Are you sure you want to log out of your account?
          </DialogDescription>
        </DialogHeader>

        {/* Actions */}
        <div className="flex gap-3">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="flex-1 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold"
              onClick={handleConfirm}
            >
              Log out
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
