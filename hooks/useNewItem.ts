import { addItem } from "@/lib/server-actions/item";
import { NewItem } from "@/types/NewItemDTO";
import { useState } from "react";
import { date } from "zod";

export function useFoodForm() {
  //const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [item, setItem] = useState<NewItem>({
    shop_id: 1,
    food_id: 1,
    title: "",
    description: "",
    image: undefined,
    published_at: new Date(Date.now()).toISOString(),
    expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setSuccess(false);
    setLoading(true);

    try {
      const res = await addItem(item);

      console.log(res);

      if (res?.status) {
        setSuccess(true);
      } else {
        setError(res?.message ? res?.message : "");
        setFieldErrors(res?.error ? res?.error : {});
      }
    } catch (err) {
      setError("Failed to post food listing");
    }

    setLoading(false);
  };

  return { item, setItem, handleSubmit, loading, error, success, fieldErrors };
}
