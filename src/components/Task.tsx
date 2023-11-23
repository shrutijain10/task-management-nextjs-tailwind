import { useState, useEffect } from "react";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Dialog, DialogTrigger } from "./ui/Dialog";
import EditTask from "./EditTask";
import { useStore } from "@/stores/StoreProvider";
import { observer } from "mobx-react-lite";

interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: string;
}

const Task = observer(({ id, title, description, status }: TaskProps) => {
  const { taskStore } = useStore();
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient ? (
        <div className="relative bg-white p-4 rounded shadow mt-1 border-b border-slate-300 max-w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{title}</h3>

            {isClient && ( // Render this only on the client side
              <div className="flex gap-1 sm:gap-3">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <button className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      <Pencil2Icon className="w-5 h-5 text-blue-500" />
                    </button>
                  </DialogTrigger>

                  <EditTask
                    id={id}
                    title={title}
                    description={description}
                    status={status}
                    open={open}
                    setOpen={setOpen}
                  />
                </Dialog>

                <button
                  className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => taskStore.deleteTask(id)}
                >
                  <TrashIcon className="w-5 h-5 text-red-500" />
                </button>
              </div>
            )}
          </div>
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold leading-none rounded-full ${
              status === "pending"
                ? "bg-red-500 text-white"
                : status === "in_progress"
                ? "bg-yellow-500 text-black"
                : "bg-green-500 text-white"
            }`}
          >
            {status === "pending"
              ? "Pending"
              : status === "in_progress"
              ? "In Progress"
              : "Completed"}
          </span>

          <p className="mt-2 text-sm text-slate-600">{description}</p>
        </div>
      ) : (
        "Prerendered"
      )}
    </div>
  );
});

export default Task;
