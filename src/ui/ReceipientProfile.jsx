import { HiX } from "react-icons/hi";
import { GetRecepientProfile } from "../features/profile/useProfile";
import Spinner from "./Spinner";
import { useSearchParams } from "react-router-dom";

export default function ReceipientProfile({ id, imageData }) {
  const { data, isLoading } = GetRecepientProfile(id);
  const [searchPrams, setSearchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  return (
    <div className="flex h-[100dvh] w-1/3 flex-col pb-5">
      <div className="dark:text-accent-light flex gap-1 px-4 py-6">
        <HiX
          size={24}
          onClick={() => {
            searchPrams.delete("profile");
            setSearchParams(searchPrams);
          }}
          className="cursor-pointer"
        />
        <h1>Contact Info</h1>
      </div>
      <div className="flex flex-col items-center py-10">
        <img
          src={data.avatar_url}
          className="mb-4 h-32 w-32 rounded-full object-cover"
        />
        <h1 className="text-lg font-bold dark:text-white">{data.fullName}</h1>
        <p className="dark:text-accent-light text-sm">@{data.username}</p>
      </div>
      <div className="bg-bg-dark mx-3 mb-4 rounded-md px-4 py-3">
        <p className="dark:text-accent-dark text-xs">About</p>
        <h2 className="text-md font-semibold dark:text-white">{data.bio}</h2>
      </div>
      <div className="bg-bg-dark mx-3 mb-4 rounded-md px-4 py-3">
        <p className="dark:text-accent-dark text-xs">Joined</p>
        <h2 className="text-md font-semibold dark:text-white">
          {Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
          }).format(new Date(data?.created_at))}
        </h2>
      </div>
      {imageData && (
        <div className="bg-bg-dark mx-3 rounded-md px-4 py-3">
          <p className="dark:text-accent-dark text-xs">Media and Files</p>
          <div className="grid h-22 grid-cols-4 gap-2 py-3">
            {imageData?.map((curImage) => (
              <div className="h-full">
                <img
                  src={curImage.content}
                  key={curImage.id}
                  className="h-16 w-full rounded-md object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex-1" />
      <button className="mx-3 mt-3 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 focus:outline-0 dark:bg-red-900/30">
        Delete chat
      </button>
    </div>
  );
}
// }
// {
//     "id": 60,
//     "created_at": "2025-03-11T10:56:25.745815+00:00",
//     "user_id": "e42ea8d1-e915-4299-a5b5-bb44073232e7",
//     "avatar_url": "https://swjwzsoqbpfsivdzudfx.supabase.co/storage/v1/object/public/userProfile/4580275e-21dd-4f10-93a0-9bd3fd9b715b",
//     "username": "verywhiteman",
//     "bio": "i'm using chatterbox by Abdone",
//     "fullName": "Very White Man",
//     "phoneNumber": "09044112212",
//     "last_seen": "2025-06-22T07:21:54.107+00:00",
//     "email": "manverywhite@gmail.com",
//     "auth_type": "email"
// }
