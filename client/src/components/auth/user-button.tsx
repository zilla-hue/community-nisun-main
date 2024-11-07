"use client";

import { useState } from "react";
import {
  Bell,
  MessageCircle,
  ChevronDown,
  LogOut,
  Users,
  Calendar,
  CreditCard,
  Settings,
  User2,
  LayoutDashboard,
  ClipboardList,
  FileCheck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import userData from "@/data/user-data.json";

interface UserButtonProps {
  onSignOut: () => void;
}

export const UserButton = ({ onSignOut }: UserButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  let {
    email,
    avatar,
    firstName,
    middleName,
    lastName,
    userRole,
    onboardingStatus,
    knowYourMember,
    membershipStatus,
  } = userData;

  const abbreviateName = (
    first_name: string,
    middle_name: string,
    last_name: string
  ) => {
    return `${first_name} ${last_name}`;
  };

  // TODO: Remove this line in production
  onboardingStatus = true;
  userRole = "ADMIN";
  membershipStatus = "ACTIVE";

  return (
    <div className="flex items-center space-x-2">
      {/* <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
        <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      </button>
      <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
        <MessageCircle className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      </button> */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger className="flex items-center space-x-1 p-1 rounded-full hover:bg-secondary">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt={`${firstName} ${lastName}`} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {firstName[0]}
              {lastName[0]}
            </AvatarFallback>
          </Avatar>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-72 mt-2 p-2 bg-popover text-popover-foreground rounded-lg shadow-lg"
          align="end"
        >
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-lg">
              {abbreviateName(firstName, middleName, lastName)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
          </div>
          {userRole === "ADMIN" && (
            <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
              <LayoutDashboard className="h-5 w-5 mr-3 text-gray-500" />
              <a href="/admin-screens/board-routes">
                Dashboard
              </a>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
            <User2 className="h-5 w-5 mr-3 text-gray-500" />
            <a href="/profile">
              <span>Profile</span>
            </a>
          </DropdownMenuItem>
          {onboardingStatus &&
            userRole !== "PENDING" &&
            membershipStatus === "ACTIVE" && (
              <>
                <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  <Users className="h-5 w-5 mr-3 text-gray-500" />
                  <a id="add-family" href="/profile/manage-family">
                    Manage Family
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                  <a id="events" href="/admin-only/events">
                    Events
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
                  <a
                    href={
                      process.env.STRIPE_BILLING_PORTAL_LINK_DEV +
                      "?prefilled_email=" +
                      email
                    }
                  >
                    Manage billing
                  </a>
                </DropdownMenuItem>
              </>
            )}
          {!onboardingStatus && (
            <>
              <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                <ClipboardList className="h-5 w-5 mr-3 text-gray-500" />
                <a href="http://localhost:3000/onboarding/start-onboarding">
                  Start Onboarding
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                <FileCheck className="h-5 w-5 mr-3 text-gray-500" />
                <a href="http://localhost:3000/onboarding/know-your-member">
                  Know Your Member
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
                <a href="http://localhost:3000/onboarding/reg-payment">
                  Registration Payment
                </a>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
            <button
              onClick={onSignOut}
              className="w-full text-left flex items-center text-red-500 hover:text-red-600"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// "use client";

// import { ExitIcon } from "@radix-ui/react-icons";

// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// import { CalendarCheck2, CreditCard, NotebookPen, PoundSterling, User2, UsersRound } from "lucide-react";
// import { useState } from "react";
// import SignOutButton from "../SignOutButton";

// interface UserButtonProps {
//   email: string;
//   avatar: string;
//   firstName: string;
//   middleName: string;
//   lastName: string;
//   userRole: string;
//   onboardingStatus: boolean;
//   knowYourMember: boolean;
//   membershipStatus: string;
// }

// export const UserButton = ({ email, knowYourMember, onboardingStatus, avatar, userRole, firstName, middleName, lastName, membershipStatus }: UserButtonProps) => {

//   const abbreviateName = (first_name: string, middle_name: string, last_name: string) => {
//     return `${first_name} ${last_name.charAt(0)}.`;

//   };

//   onboardingStatus = true, userRole = "ADMIN", membershipStatus = "ACTIVE"; // TODO: please remove me latter

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger id="profile-dropdown" className="outline-none">
//         <Avatar className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors border border-slate-300 dark:border-slate-600">
//           <div className="flex items-center justify-center w-full h-full">
//             <User2 className="h-5 w-5 text-slate-600 dark:text-slate-300" />
//             <span className="font-semibold">
//               {firstName[0]}
//               {lastName[0]}
//             </span>
//           </div>
//           <AvatarFallback>
//             <span className="font-semibold">
//               {firstName[0]}
//               {lastName[0]}
//             </span>
//           </AvatarFallback>
//         </Avatar>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-fit" align="end">
//         <DropdownMenuItem>
//           <User2 className="h-4 w-4 mr-2 hover:animate-bounce" />
//           <a href="/profile">
//             <span id="profile-name" className="dark:text-slate-100">
//               {abbreviateName(firstName, middleName, lastName)}
//             </span>
//           </a>
//         </DropdownMenuItem>

//         {onboardingStatus &&
//         userRole !== "PENDING" &&
//         membershipStatus === "ACTIVE" ? (
//           <>
//             <DropdownMenuItem>
//               <UsersRound className="h-4 w-4 mr-2 hover:animate-bounce" />
//               <a id="add-family" href="/profile/manage-family">
//                 Manage family
//               </a>
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <CalendarCheck2 className="h-4 w-4 mr-2 hover:animate-bounce" />

//               <a id="events" href="/admin-only/events">
//                 Events
//               </a>
//             </DropdownMenuItem>

//             <DropdownMenuItem>
//               <CreditCard className="h-4 w-4 mr-2 hover:animate-bounce text-red-600" />
//               <a
//                 href={
//                   process.env.STRIPE_BILLING_PORTAL_LINK_DEV +
//                   "?prefilled_email=" +
//                   email
//                 }
//               >
//                 Manage billing
//               </a>
//             </DropdownMenuItem>
//           </>
//         ) : (
//           <>
//             <DropdownMenuItem>
//               <NotebookPen className="h-4 w-4 mr-2 hover:animate-bounce text-red-600" />
//               <a href="/admin-only/members/onboarding">Start onboarding</a>
//             </DropdownMenuItem>
//           </>
//         )}
//         <DropdownMenuItem>
//           {/* <ExitIcon className="h-4 w-4 mr-2 hover:animate-bounce" /> */}
//           <SignOutButton
//             variant="destructive"
//             size="sm"
//             className="w-full hover:bg-red-800 text-white"
//           >
//             Logout
//           </SignOutButton>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };
