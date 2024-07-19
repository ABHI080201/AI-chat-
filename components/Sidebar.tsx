// import { useCallback } from "react";
// import { useRouter } from "next/router";

// import { RiMoreFill } from "react-icons/ri";

// import useLoginModal from "@/hooks/useLoginModal";
// import useCurrentUser from "@/hooks/useCurrentUser";
// import useTweetActionModal from "@/hooks/useTweetActionModal";

// import SidebarLogo from "@/components/SidebarLogo";
// import SidebarItem from "@/components/SidebarItem";
// import Button from "@/components/shared/Button";

// import { SidebarItems } from "@/utils/@fake.db";

// import Avatar from "./Avatar";

// const Sidebar = () => {
//   const { onOpen } = useLoginModal();
//   const { onOpen: tweetModal } = useTweetActionModal();
//   const { data: currentUser } = useCurrentUser();
//   const router = useRouter();

//   const handleShareClick = useCallback(() => {
//     if (!currentUser?.email) {
//       return onOpen();
//     } else {
//       return tweetModal();
//     }
//   }, [currentUser?.email, onOpen, tweetModal]);

//   const RenderSidebarItems = useCallback(() => {
//     const sideBarItems = currentUser?.email
//       ? [...SidebarItems]
//           .filter((item) => item.active)
//           .filter((item) => {
//             if (item.href === "/notifications") {
//               item.alert = currentUser?.hasNotification;
//             }
//             return item;
//           })
//       : [...SidebarItems]
//           .filter((item) => item.active)
//           .filter((item) => item.public);

//     return (
//       <div className="space-y-1">
//         {sideBarItems.map((item, index) => (
//           <SidebarItem
//             label={item.label}
//             icon={item.icon}
//             secondaryIcon={item.secondaryIcon}
//             href={item.href}
//             onClick={item.onClick}
//             key={index}
//             alert={item?.alert}
//           />
//         ))}
//       </div>
//     );
//   }, [currentUser?.email, currentUser?.hasNotification]);
//   return (
//     <div className="mt-[0.875rem] px-1 h-full col-span-1 sm:px-4 md:px-6 flex items-start justify-center">
//       <div className="absolute flex flex-col items-center md:items-start h-full">
//         <div className="flex flex-col h-full justify-between">
//           <div className="space-y-2.5 lg:w-[230px] self-center">
//             <SidebarLogo />
//             <RenderSidebarItems />
//             <Button
//               label="Quill"
//               fullWidth
//               // size="md"
//               // showShareButton
//               // marginVertical="!my-5"
//               onClick={handleShareClick}
//             />
//           </div>
//           {currentUser && (
//             <div
//               className="bottom-0 flex gap-5 items-center justify-center rounded-full cursor-pointer hover:bg-neutral-800 hover:bg-opacity-70 mb-5 transition-colors p-2"
//               onClick={() => router.push("/users/" + currentUser?.username)}
//             >
//               <div>
//                 <Avatar username={currentUser?.username} size="small" />
//               </div>
//               <>
//                 <div className="flex flex-col items-start justify-center">
//                   <div className="text-white font-bold text-sm text-ellipsis whitespace-nowrap max-w-full w-full overflow-hidden">
//                     {currentUser?.name}
//                   </div>
//                   <div className="text-gray-500 text-sm">
//                     @{currentUser?.username}
//                   </div>
//                 </div>
//                 <div>
//                   <RiMoreFill size={24} color="#fff" />
//                 </div>
//               </>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import { useCallback } from "react";
import { useRouter } from "next/router";

import { RiMoreFill } from "react-icons/ri";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useTweetActionModal from "@/hooks/useTweetActionModal";

import SidebarLogo from "@/components/SidebarLogo";
import SidebarItem from "@/components/SidebarItem";
import Button from "@/components/shared/Button";

import { SidebarItems } from "@/utils/@fake.db";

import Avatar from "./Avatar";

const Sidebar = () => {
  const { onOpen } = useLoginModal();
  const { onOpen: tweetModal } = useTweetActionModal();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  const handleShareClick = useCallback(() => {
    if (!currentUser?.email) {
      return onOpen();
    } else {
      return tweetModal();
    }
  }, [currentUser?.email, onOpen, tweetModal]);

  const RenderSidebarItems = useCallback(() => {
    const sideBarItems = currentUser?.email
      ? [...SidebarItems]
          .filter((item) => item.active)
          .filter((item) => {
            if (item.href === "/notifications") {
              item.alert = currentUser?.hasNotification;
            }
            return item;
          })
      : [...SidebarItems]
          .filter((item) => item.active)
          .filter((item) => item.public);

    return (
      <div className="flex md:flex-col md:space-y-1 space-x-4 md:space-x-0">
        {sideBarItems.map((item, index) => (
          <SidebarItem
            label={item.label}
            icon={item.icon}
            secondaryIcon={item.secondaryIcon}
            href={item.href}
            onClick={item.onClick}
            key={index}
            alert={item?.alert}
            className="flex flex-col items-center"
          />
        ))}
      </div>
    );
  }, [currentUser?.email, currentUser?.hasNotification]);

  return (
    <>
      {/* Sidebar for large screens */}
      <div className="mt-[0.875rem] px-1 h-full col-span-1 sm:px-4 md:px-6 flex items-start justify-center hidden md:flex">
        <div className="absolute flex flex-col items-center md:items-start h-full w-full ">
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-2.5 lg:w-[230px] self-center">
              <SidebarLogo />
              <RenderSidebarItems />
              <Button
                label="Quill"
                fullWidth
                size="md"
                showShareButton
                marginVertical="!my-5"
                onClick={handleShareClick}
              />
            </div>
          </div>
          {currentUser && (
            <div
              className="bottom-0 flex gap-5 items-center justify-center rounded-full cursor-pointer hover:bg-neutral-800 hover:bg-opacity-70 mb-5 transition-colors p-2 hidden md:flex"
              onClick={() => router.push("/users/" + currentUser?.username)}
            >
              <div>
                <Avatar username={currentUser?.username} size="small" />
              </div>
              <>
                <div className="flex flex-col items-start justify-center">
                  <div className="text-white font-bold text-sm text-ellipsis whitespace-nowrap max-w-full w-full overflow-hidden">
                    {currentUser?.name}
                  </div>
                  <div className="text-gray-500 text-sm">
                    @{currentUser?.username}
                  </div>
                </div>
                <div>
                  <RiMoreFill size={24} color="#fff" />
                </div>
              </>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar for small and medium screens */}
      <div className="fixed bottom-0 left-0 right-0 bg-neutral-800 py-2 px-2 flex justify-between items-center md:hidden transition-opacity duration-[170ms] ease-[cubic-bezier(0,0,1,1)] opacity-0.5 z-30">
        <RenderSidebarItems />
        <Button
          label="Quill"
          // size="sm"
          // showShareButton
          onClick={handleShareClick}
        />
      </div>
    </>
  );
};

export default Sidebar;
