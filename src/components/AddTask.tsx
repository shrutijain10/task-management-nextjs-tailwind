"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { useStore } from "@/stores/StoreProvider";

const AddTask = observer(() => {
  const { taskStore } = useStore();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>();
  const [error, setError] = useState<string>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length < 3) {
      setError("Please enter a title with at least 3 characters");
    } else if (description.length < 3) {
      setError("Please enter a description with at least 3 characters");
    } else if (!status) {
      setError("Please select a status for the task");
    } else {
      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        status,
      };

      taskStore.addTask(newTask);

      // Reset the input values
      setTitle("");
      setDescription("");
      setStatus("");
      setError("");
      setOpen(!open);
    }
  };

  return (
    <h1>
      {isClient ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add New Task
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl">Add Task</DialogTitle>
              <DialogDescription>
                Add a new Task to your Task Manager here. Click save when you
                are done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleNewTask}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-2">
                  <label
                    htmlFor="name"
                    className="text-left block text-gray-700 text-sm font-bold mb-2"
                  >
                    Title
                  </label>
                  <input
                    id="name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="col-span-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <label
                    htmlFor="description"
                    className="text-left block text-gray-700 text-sm font-bold mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="col-span-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-2">
                  <label
                    htmlFor="status"
                    className="text-left block text-gray-700 text-sm font-bold mb-2"
                  >
                    Status
                  </label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Task Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {error && (
                  <p className="text-center py-1 rounded bg-error-background text-error-foreground">
                    {error}
                  </p>
                )}
              </div>

              <DialogFooter>
                <button
                  className="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Save Task
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        "Prerendered"
      )}
    </h1>
  );
});

export default AddTask;
