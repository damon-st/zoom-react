import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setToast } from "../app/slices/MeetingSlice";

export default function useToast() {
  const toasts = useAppSelector((zoom) => zoom.meeting.toasts);
  const dispatch = useAppDispatch();
  const createToast = ({ title, type }: { title: string; type: any }) => {
    dispatch(
      setToast(
        toasts.concat({
          id: new Date().toISOString(),
          title,
          color: type,
        })
      )
    );
  };

  return [createToast];
}
