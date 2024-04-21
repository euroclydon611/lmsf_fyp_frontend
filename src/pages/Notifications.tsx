import { useState } from "react";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  useNotificationListQuery,
  useReadNotificationMutation,
} from "../redux/features/notification/notificationApi";
import { formatDate3 } from "../utils/utilityFunctions";

import {
  MdOutlineMarkEmailUnread,
  MdOutlineMarkEmailRead,
} from "react-icons/md";

const Notifications = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    data: notificationData,
    isLoading: notificationLoading,
    refetch,
  } = useNotificationListQuery({ id: user?._id });

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isUnreadView, setIsUnreadView] = useState(true);

  const [readNotification] = useReadNotificationMutation();

  const handleReadNotification = async (notification: any) => {
    await readNotification({ notificationId: notification });
    refetch();
  };

  if (notificationLoading) {
    return <Loader />;
  }

  // Filter messages based on the view mode (unread/read)
  const messagesToShow = isUnreadView
    ? notificationData?.notifications
    : notificationData?.notifications;

  return (
    <>
      <div>
        <section className="pt-5 px-2">
          <h3 className="text-[18px] font-[600]">Notifications</h3>
        </section>

        {/* Messages */}
        <section className="pt-5 px-2">
          {messagesToShow &&
            messagesToShow.map((notification: any, i: any) => (
              <div
                key={notification?._id}
                className={`border-y-[0.5px] flex gap-4 ${
                  notification?.status === "Pending" && "font-bold"
                } md:text-base cursor-pointer py-3`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div>
                  <p>{notification?.message}</p>
                </div>
                <div>
                  <p>{formatDate3(notification?.createdAt)}</p>
                </div>
                <div className="flex gap-3 action-buttons">
                  {hoveredIndex === i && (
                    <>
                      {/* <div>
                        <MdDeleteOutline size={25} title="Delete" />
                      </div> */}
                      <div>
                        {notification?.status === "Pending" ? (
                          <MdOutlineMarkEmailRead
                            onClick={() =>
                              handleReadNotification(notification._id)
                            }
                            size={24}
                            title="Mark as read"
                          />
                        ) : (
                          <MdOutlineMarkEmailUnread
                            size={24}
                            title="Message read"
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
        </section>
      </div>
    </>
  );
};

export default Notifications;
