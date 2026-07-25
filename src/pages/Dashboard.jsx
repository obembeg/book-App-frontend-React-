import { useState } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import { useContext, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";
import Deleted from "./Deleted";
// import socket from "../socket";
import {
  IoBookOutline,
  IoPricetagOutline,
  IoFolderOpenOutline,
  IoAddCircleOutline,
  IoArrowBackOutline,
  IoShieldCheckmarkOutline,
  IoLockClosedOutline,
  IoLockOpenOutline,
  IoCreateOutline,
  IoTrashOutline,
  IoEyeOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoChevronForwardOutline,
  IoListOutline,
  IoCardOutline,
} from "react-icons/io5";

function Dashboard() {
  const {
    getAllBooks,
    everyBook,
    token,
    apiurl,
    books,
    title,
    setTitle,
    description,
    author,
    setDescription,
    price,
    setPrice,
    setAuthor,
    category,
    setCategory,
    categoryName,
    setCategoryName,
    isLoading,
    setIsLoading,
    editMode,
    setEditMode,
    bookId,
    setBookId,
    categoryId,
    setCategoryId,
    userId,
    setUserId,
    deleted,
    setDeleted,
    isAdmin,
    setIsAdmin,
    users,
    deletedUser,
    setDeletedUser,
    selectedUserId,
    setSelectedUserId,
    accessControl,
    setAccessControl,
    viewAccess,
    setViewAccess,
    viewUsers,
    setViewUsers,
    removeAccess,
    allowAccess,
    removeAdmin,
    notification,
    notificationA,
    makeAdmin,
    createBookAdmin,
    updateBookAdmin,
    adminDelete,
    setAdminDelete,
    setBookAdmin,
    bookAdmin,
    getAllUsers,
    setViewCategory,
    viewCategory,
    getAllCategory,
    fetchUser,
    user,
  } = useContext(storeContext);

  const [yourBooks, setYourBooks] = useState(false);
  const [platformBooks, setPlatformBooks] = useState(false);

  const selectedUser = users.find((user) => user.id === selectedUserId);

  useEffect(() => {
    getAllBooks();
    fetchUser();
  }, []);

  // socket.on("fetchUser", () => {
  //   fetchUser();
  // });

  const createBook = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiurl}/book/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          author,
          price,
          description,
          categoryId: category,
        }),
      });
      setIsLoading(false);
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        console.log(data);
      } else if (response.status === 403 || 404) {
        const data = await response.json();
        toast.error(data.message);
        console.log(data);
      }
    } catch (error) {
      toast.error("Failed to create book, Try again");
      console.log(error);
      setIsLoading(false);
    } finally {
      getAllBooks();
    }
  };

  const editCategory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiurl}/category/update `, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: categoryName,
          description,
          categoryId: categoryId,
        }),
      });
      setIsLoading(false);
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        console.log(data);
      } else if (response.status === 404) {
        const data = await response.json();
        toast.error(data.message);
        console.log(data);
      }
    } catch (error) {
      toast.error("Failed to update category, Try again");
      console.log(error);
      setIsLoading(false);
    } finally {
      getAllCategory();
    }
  };

  const createCategory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiurl}/category/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: categoryName,
          description,
        }),
      });
      setIsLoading(false);
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        console.log(data);
      } else if (response.status === 403) {
        const data = await response.json();
        toast.error(data.message);
        console.log(data);
      }
    } catch (error) {
      toast.error("Failed to create category, Try again");
      console.log(error);
      setIsLoading(false);
    } finally {
      getAllCategory();
    }
  };

  const updateBook = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiurl}/book/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          bookId: bookId,
          author,
          price,
          description,
          categoryId: category,
        }),
      });
      setIsLoading(false);
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        console.log(data);
      }
    } catch (error) {
      toast.error("Failed to update book, Try again");
      console.log(error);
      setIsLoading(false);
    } finally {
      getAllBooks();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthor("");
    setCategory("");
    setTitle("");
    setPrice("");
    setDescription("");
    createBook();
  };

  const addCategory = (e) => {
    e.preventDefault();
    setCategoryName("");
    setDescription("");
    createCategory();
  };

  const updateCategory = (e) => {
    e.preventDefault();
    setEditMode(false);
    setCategoryName("");
    setDescription("");
    editCategory();
  };

  const addBookAdmin = (e) => {
    e.preventDefault();
    createBookAdmin(selectedUser.id);
    setBookAdmin(false);
    setAuthor("");
    setCategory("");
    setTitle("");
    setPrice("");
    setDescription("");
  };

  const adminUpdateBook = (e) => {
    e.preventDefault();
    updateBookAdmin(selectedUser.id);
    setEditMode(false);
    setBookAdmin(false);
    setAuthor("");
    setCategory("");
    setTitle("");
    setPrice("");
    setDescription("");
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateBook();
    setEditMode(false);
    setAuthor("");
    setCategory("");
    setTitle("");
    setPrice("");
    setDescription("");
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-xl bg-slate-950/60 grow flex items-center justify-center p-4">
        <Spinner />
      </div>
    );
  }
  if (deleted) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-xl bg-slate-950/60 grow flex items-center justify-center p-4 animate-fade-in-up">
        <Deleted text="delete book" />
      </div>
    );
  }
  if (adminDelete) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-xl bg-slate-950/60 grow flex items-center justify-center p-4 animate-fade-in-up">
        <Deleted text="delete this book" />
      </div>
    );
  }
  if (deletedUser) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-xl bg-slate-950/60 grow flex items-center justify-center p-4 animate-fade-in-up">
        <Deleted text="delete this user" />
      </div>
    );
  }

  // ==========================================================================
  // ADMIN DASHBOARD VIEW
  // ==========================================================================
  if (isAdmin) {
    return (
      <div className="grow bg-mesh-glow min-h-[calc(100vh-80px)] p-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full animate-fade-in-down">
        {/* Welcome Section */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 sm:p-8 bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-xl">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Welcome,{" "}
              <span className="bg-linear-to-r from-indigo-300 via-purple-300 to-indigo-100 bg-clip-text text-transparent">
                Admin
              </span>
            </h1>
            <p className="text-slate-400 text-sm">
              Manage users, books, access levels, and reading categories.
            </p>
          </div>

          {viewUsers || viewCategory ? (
            <button
              onClick={() => {
                setViewUsers(false);
                setSelectedUserId(null);
                setViewAccess(null);
                setViewCategory(false);
              }}
              className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-slate-300 hover:text-white bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl transition duration-200 cursor-pointer active:scale-95 shadow-lg shadow-black/10"
            >
              <IoArrowBackOutline className="w-4 h-4" />
              Back Dashboard
            </button>
          ) : (
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setViewUsers(true)}
                className="flex items-center gap-2 justify-center px-5 py-3 w-full sm:w-auto text-sm font-bold text-indigo-400 hover:text-white bg-indigo-950/20 hover:bg-indigo-600/90 border border-indigo-900/40 hover:border-transparent rounded-xl transition duration-200 cursor-pointer active:scale-95 shadow-md shadow-indigo-950/20"
              >
                <IoPeopleOutline className="w-4 h-4" />
                Manage Users
              </button>
              <button
                onClick={() => setViewCategory(true)}
                className="flex items-center gap-2 justify-center px-5 py-3 w-full sm:w-auto text-sm font-bold text-purple-400 hover:text-white bg-purple-950/20 hover:bg-purple-600/90 border border-purple-900/40 hover:border-transparent rounded-xl transition duration-200 cursor-pointer active:scale-95 shadow-md shadow-purple-950/20"
              >
                <IoListOutline className="w-4 h-4" />
                Categories
              </button>
            </div>
          )}
        </header>

        {/* Dashboard Grid Landing (when no subview open) */}
        {!viewCategory && !viewUsers && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-xl flex flex-col justify-between hover:border-slate-700/60 transition duration-300">
              <div className="space-y-4">
                <div className="p-3 w-fit bg-indigo-950/40 border border-indigo-800/30 rounded-2xl text-indigo-400">
                  <IoPeopleOutline className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Users Directory
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Verify members list, update platform roles, delete users, and
                  review individual user book catalog.
                </p>
              </div>
              <button
                onClick={() => setViewUsers(true)}
                className="mt-6 flex items-center justify-between text-sm font-bold text-indigo-400 group cursor-pointer hover:underline"
              >
                Go to directory
                <IoChevronForwardOutline className="w-4 h-4 group-hover:translate-x-1 transition duration-250" />
              </button>
            </div>

            <div className="p-6 bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-xl flex flex-col justify-between hover:border-slate-700/60 transition duration-300">
              <div className="space-y-4">
                <div className="p-3 w-fit bg-purple-950/40 border border-purple-800/30 rounded-2xl text-purple-400">
                  <IoListOutline className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Categories & Tags
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Organize books context by creating and adjusting categories
                  (e.g. Science, Literature, Engineering).
                </p>
              </div>
              <button
                onClick={() => setViewCategory(true)}
                className="mt-6 flex items-center justify-between text-sm font-bold text-purple-400 group cursor-pointer hover:underline"
              >
                Go to categories
                <IoChevronForwardOutline className="w-4 h-4 group-hover:translate-x-1 transition duration-250" />
              </button>
            </div>

            <div className="p-6 bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-xl flex flex-col justify-between hover:border-slate-700/60 transition duration-300">
              <div className="space-y-4">
                <div className="p-3 w-fit bg-amber-950/40 border border-amber-800/30 rounded-2xl text-amber-400">
                  <IoBookOutline className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Info Hub</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  There are currently {users.length} active users indexing{" "}
                  {everyBook.length} publications.
                  <br />
                  Open directory to update or modify specific items.
                </p>
              </div>
              <div className="mt-6 text-sm text-slate-500 font-semibold tracking-wider uppercase">
                Global Active Index
              </div>
            </div>
          </div>
        )}

        {/* Categories Section */}
        {viewCategory && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: List Categories */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <IoListOutline className="w-6 h-6 text-purple-400" />
                Existing Categories
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.isArray(category) && category.length > 0 ? (
                  category.map((cat) => (
                    <div
                      key={cat.id}
                      className="p-5 bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl hover:border-slate-700/60 transition duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-950/40 px-2.5 py-1 rounded-full border border-purple-800/20">
                          ID: {cat.id}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-2.5 mb-1.5">
                          {cat.name}
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                          {cat.description || "No description provided."}
                        </p>
                      </div>

                      <div className="flex gap-2.5 pt-4 mt-auto">
                        <button
                          onClick={() => {
                            setEditMode(true);
                            setDescription(cat.description);
                            setCategoryName(cat.name);
                            setCategoryId(cat.id);
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-400 hover:text-white bg-amber-950/20 hover:bg-amber-600 rounded-lg transition duration-200 border border-amber-900/35 hover:border-transparent cursor-pointer"
                        >
                          <IoCreateOutline className="w-3.5 h-3.5" />
                          Edit
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-8 text-center text-slate-500 font-medium bg-slate-900/20 rounded-2xl border border-slate-900">
                    No categories found.
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Form Create/Update */}
            <div className="lg:col-span-5 bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
              {editMode ? (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      Update Category
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Update details for the selected category.
                    </p>
                  </div>

                  <form onSubmit={updateCategory} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-655 transition duration-200"
                        placeholder="Category Name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        Category ID
                      </label>
                      <input
                        type="number"
                        required
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        readOnly
                        className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-slate-500 focus:outline-none rounded-xl text-sm transition duration-200 select-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        placeholder="About category..."
                        required
                        className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition duration-200 resize-none"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-xl shadow-lg transition cursor-pointer"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMode(false);
                          setCategoryName("");
                          setDescription("");
                        }}
                        className="px-4 py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-sm font-bold rounded-xl transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      Create Category
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Add to list of existing categories.
                    </p>
                  </div>

                  <form onSubmit={addCategory} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-655 transition duration-200"
                        placeholder="e.g. Science fiction"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        placeholder="Detail the target genres and topics for this category..."
                        required
                        className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition duration-200 resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full flex justify-center items-center px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/15 transition cursor-pointer"
                      >
                        Add Category
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users Section */}
        {viewUsers && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <IoPeopleOutline className="w-6 h-6 text-indigo-400" />
              Platform Users Directory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(users) && users.length > 0 ? (
                users.map((u) => (
                  <div
                    key={u.id}
                    className={`p-6 bg-slate-900/40 backdrop-blur-xl border rounded-3xl hover:border-slate-700/60 transition duration-300 flex flex-col justify-between ${
                      u.isAdmin
                        ? "border-indigo-900/50 shadow-lg shadow-indigo-950/10"
                        : "border-slate-800/80"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-slate-200 shadow-md">
                          {u?.profile?.fullName
                            ? u.profile.fullName[0].toUpperCase()
                            : u.email[0].toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-white leading-tight">
                            {u?.profile?.fullName || "No profile setup"}
                          </h3>
                          <p className="text-xs text-slate-500 truncate max-w-45 mt-1">
                            {u.email}
                          </p>
                        </div>
                      </div>

                      {/* Info badging */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {u.isAdmin && (
                          <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-950/40 border border-indigo-900/35 px-2 py-0.5 rounded-full">
                            Admin Role
                          </span>
                        )}
                        <span
                          className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                            u.isAllowed
                              ? "text-emerald-400 bg-emerald-950/40 border-emerald-900/35"
                              : "text-rose-400 bg-rose-950/40 border-rose-900/35"
                          }`}
                        >
                          {u.isAllowed ? "Can Publish" : "Publish Blocked"}
                        </span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-slate-800/60 mt-auto">
                      <button
                        onClick={() => {
                          setSelectedUserId(u.id);
                          setViewAccess(null);
                          window.scrollTo({
                            top: document.body.scrollHeight,
                            behavior: "smooth",
                          });
                        }}
                        className="flex flex-col gap-1 items-center justify-center py-2 text-[10px] font-bold text-slate-400 hover:text-indigo-400 bg-slate-950/45 hover:bg-slate-950 border border-slate-800/60 rounded-xl transition duration-200 cursor-pointer"
                        title="View Books"
                      >
                        <IoBookOutline className="w-4 h-4" />
                        <span>Books ({u.books?.length || 0})</span>
                      </button>

                      <button
                        onClick={() => {
                          setViewAccess(u);
                          setSelectedUserId(null);
                          window.scrollTo({
                            top: document.body.scrollHeight,
                            behavior: "smooth",
                          });
                        }}
                        className="flex flex-col gap-1 items-center justify-center py-2 text-[10px] font-bold text-slate-400 hover:text-amber-400 bg-slate-950/45 hover:bg-slate-950 border border-slate-800/60 rounded-xl transition duration-200 cursor-pointer"
                        title="Access Settings"
                      >
                        {/* <IoSettingsOutline className="w-4 h-4" /> */}
                        <span>Access</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserId(u.id);
                          setDeletedUser(true);
                        }}
                        className="flex flex-col gap-1 items-center justify-center py-2 text-[10px] font-bold text-slate-400 hover:text-rose-400 bg-slate-950/45 hover:bg-slate-950 border border-slate-800/60 rounded-xl transition duration-200 cursor-pointer"
                        title="Delete User"
                      >
                        <IoTrashOutline className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 py-12 text-center text-slate-500 bg-slate-900/20 border border-slate-900 rounded-3xl">
                  No directory users index available.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Access Control Subview */}
        {viewAccess && (
          <div className="max-w-2xl mx-auto bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800/60">
              <div className="p-2.5 bg-amber-950/40 border border-amber-900/30 rounded-xl text-amber-400">
                <IoShieldCheckmarkOutline className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Access Permissions
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update role bindings for{" "}
                  {viewAccess.profile?.fullName || viewAccess.email}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Admin toggle row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-950/50 border border-slate-800 rounded-2xl gap-3">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Administrator Access
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Grants full admin system read/write overrides.
                  </p>
                </div>

                {viewAccess.isAdmin ? (
                  <button
                    onClick={async () => await removeAdmin(viewAccess.id)}
                    className="w-full sm:w-auto px-4 py-2 bg-rose-950/40 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-900/45 hover:border-transparent text-xs font-bold rounded-xl transition duration-200 cursor-pointer active:scale-95"
                  >
                    Revoke Admin
                  </button>
                ) : (
                  <button
                    onClick={() => makeAdmin(viewAccess.id)}
                    className="w-full sm:w-auto px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-900/35 hover:border-transparent text-xs font-bold rounded-xl transition duration-200 cursor-pointer active:scale-95"
                  >
                    Appoint Admin
                  </button>
                )}
              </div>

              {/* Allowed book creation toggle row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-950/50 border border-slate-800 rounded-2xl gap-3">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Publishing Authority
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Permits user to create or publish catalog titles.
                  </p>
                </div>

                {viewAccess.isAllowed ? (
                  <button
                    onClick={async () => {
                      await removeAccess(viewAccess.id);
                      await notification(viewAccess.id);
                    }}
                    className="w-full sm:w-auto px-4 py-2 bg-rose-950/40 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-900/45 hover:border-transparent text-xs font-bold rounded-xl transition duration-200 cursor-pointer active:scale-95"
                  >
                    Disable Publishing
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      await allowAccess(viewAccess.id);
                      await notificationA(viewAccess.id);
                    }}
                    className="w-full sm:w-auto px-4 py-2 bg-emerald-650/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-900/35 hover:border-transparent text-xs font-bold rounded-xl transition duration-200 cursor-pointer active:scale-95"
                  >
                    Enable Publishing
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Selected User's Books Display */}
        {selectedUser && (
          <div className="p-6 sm:p-8 bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-white">
                  Books by{" "}
                  {selectedUser.profile?.fullName || selectedUser.email}
                </h2>
                <p className="text-xs text-slate-500">
                  Currently hosting {selectedUser.books?.length || 0} catalog
                  publications.
                </p>
              </div>

              <button
                onClick={() => setBookAdmin(true)}
                className="flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-bold text-indigo-400 hover:text-white bg-indigo-950/30 hover:bg-indigo-600 border border-indigo-900/40 hover:border-transparent rounded-xl transition duration-200 cursor-pointer active:scale-95"
              >
                <IoAddCircleOutline className="w-4 h-4" />
                Add Book for User
              </button>
            </div>

            {/* Book Admin Add/Update Modal Overlay */}
            {bookAdmin && (
              <div className="fixed inset-0 z-50 backdrop-blur-xl bg-slate-950/60 grow flex items-center justify-center p-4">
                {editMode ? (
                  <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in-down">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-850">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Modify User Book
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Admin catalog override controls.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setEditMode(false);
                          setBookAdmin(false);
                          setAuthor("");
                          setCategory("");
                          setTitle("");
                          setPrice("");
                          setDescription("");
                        }}
                        className="text-slate-400 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-950 border border-slate-800/80 cursor-pointer transition"
                      >
                        Back
                      </button>
                    </div>

                    <form onSubmit={adminUpdateBook} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                          Book Title
                        </label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter book title"
                          required
                          className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Author
                          </label>
                          <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Author name"
                            required
                            className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Price (₦)
                          </label>
                          <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0.00"
                            required
                            className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                          Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition"
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="1">General</option>
                          <option value="2">Science and Technology</option>
                          <option value="3">Arts and History</option>
                          <option value="4">Philosophy</option>
                          <option value="5">Religion</option>
                          <option value="6">Politics</option>
                          <option value="7">Education</option>
                          <option value="8">Health</option>
                          <option value="9">Travel and Nature</option>
                          <option value="10">
                            Food, Lifestyle and General well-being
                          </option>
                          <option value="11">Sports</option>
                          <option value="12">Others</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                          Description
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows="3"
                          placeholder="Tell readers about this book..."
                          required
                          className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition resize-none"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg transition cursor-pointer"
                        >
                          Update Book
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in-down">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-855">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Create Book entry
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Admin catalog override entry.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setBookAdmin(false);
                          setAuthor("");
                          setCategory("");
                          setTitle("");
                          setPrice("");
                          setDescription("");
                        }}
                        className="text-slate-400 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-950 border border-slate-800/80 cursor-pointer transition"
                      >
                        Back
                      </button>
                    </div>

                    <form onSubmit={addBookAdmin} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                          Book Title
                        </label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter book title"
                          required
                          className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Author
                          </label>
                          <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Author name"
                            required
                            className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Price (₦)
                          </label>
                          <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0.00"
                            required
                            className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                          Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-slate-350 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition"
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="1">General</option>
                          <option value="2">Science and Technology</option>
                          <option value="3">Arts and History</option>
                          <option value="4">Philosophy</option>
                          <option value="5">Religion</option>
                          <option value="6">Politics</option>
                          <option value="7">Education</option>
                          <option value="8">Health</option>
                          <option value="9">Travel and Nature</option>
                          <option value="10">
                            Food, Lifestyle and General well-being
                          </option>
                          <option value="11">Sports</option>
                          <option value="12">Others</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                          Description
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows="3"
                          placeholder="Tell readers about this book..."
                          required
                          className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition resize-none"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition cursor-pointer"
                        >
                          Publish Book
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* List of user books */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {selectedUser.books.length > 0 ? (
                selectedUser.books.map((book) => (
                  <div
                    key={book.id}
                    className="p-6 rounded-2xl bg-slate-950/60 border border-slate-850 hover:border-slate-700 transition duration-300 shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="text-lg font-bold text-white leading-snug">
                          {book.title}
                        </h4>
                        <span className="text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
                          ₦{Number(book.price).toLocaleString()}
                        </span>
                      </div>

                      <p className="text-xs text-indigo-400 font-semibold mt-1">
                        by {book.author}
                      </p>

                      {book.category && (
                        <span className="inline-block mt-3 text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {book.category.name}
                        </span>
                      )}

                      <p className="text-slate-400 text-xs mt-3.5 leading-relaxed line-clamp-3">
                        {book.description}
                      </p>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-4 mt-6 border-t border-slate-900">
                      <button
                        onClick={() => {
                          setBookAdmin(true);
                          setEditMode(true);
                          setBookId(book.id);
                          setAuthor(book.author);
                          setCategory(book.category.id);
                          setTitle(book.title);
                          setPrice(book.price);
                          setDescription(book.description);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-400 hover:text-white bg-indigo-950/20 hover:bg-indigo-650 rounded-lg transition duration-200 border border-indigo-900/40 hover:border-transparent cursor-pointer"
                      >
                        <IoCreateOutline className="w-3.5 h-3.5" />
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setBookId(book.id);
                          setAdminDelete(true);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:text-white bg-rose-950/20 hover:bg-rose-650 rounded-lg transition duration-200 border border-rose-900/40 hover:border-transparent cursor-pointer"
                      >
                        <IoTrashOutline className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 font-medium col-span-2 text-center py-6">
                  No books registered under this user account.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================================================
  // USER DASHBOARD VIEW
  // ==========================================================================
  return (
    <div className="grow bg-mesh-glow min-h-[calc(100vh-80px)] p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8 animate-fade-in-down">
      {/* User Dashboard Welcome Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 sm:p-8 bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Reading{" "}
            {user.isAllowed ? (
              <span className="bg-linear-to-r from-indigo-300 via-purple-300 to-indigo-100 bg-clip-text text-transparent">
                Workspace
              </span>
            ) : (
              <span className="bg-linear-to-r from-indigo-300 via-purple-300 to-indigo-100 bg-clip-text">
                Workspace 🚫
              </span>
            )}
          </h1>
          <p className="text-slate-400 text-sm">
            Add, configure, and browse your personal book index.
          </p>
        </div>
        <div>
          <h2 className="text-sm text-slate-400 font-semibold tracking-wide uppercase">
            View{" "}
            <span
              onClick={() => {
                setYourBooks(!yourBooks);
              }}
              className="text-blue-500 cursor-pointer"
            >
              Your Books
            </span>{" "}
            or Explore{" "}
            <span
              onClick={() => {
                setPlatformBooks(true);
              }}
              className="text-blue-500 cursor-pointer"
            >
              All Books
            </span>
          </h2>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Create / Update Form */}
        <div className="lg:col-span-4 bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
          {editMode ? (
            <div className="space-y-5">
              <div className="flex justify-between items-center pb-3 border-b border-slate-850">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Modify Book
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Edit entry information below.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setAuthor("");
                    setCategory("");
                    setTitle("");
                    setPrice("");
                    setDescription("");
                  }}
                  className="flex items-center gap-1 text-slate-400 hover:text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-slate-950 border border-slate-800 transition cursor-pointer"
                >
                  <IoArrowBackOutline className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Book Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter book title"
                    required
                    className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-700 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Author
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author name"
                    required
                    className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-700 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Price (₦)
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      required
                      className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-700 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-slate-350 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="1">General</option>
                      <option value="2">Science and Technology</option>
                      <option value="3">Arts and History</option>
                      <option value="4">Philosophy</option>
                      <option value="5">Religion</option>
                      <option value="6">Politics</option>
                      <option value="7">Education</option>
                      <option value="8">Health</option>
                      <option value="9">Travel and Nature</option>
                      <option value="10">
                        Food, Lifestyle and General well-being
                      </option>
                      <option value="11">Sports</option>
                      <option value="12">Others</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    placeholder="Tell readers about this book..."
                    required
                    className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-700 transition resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold rounded-xl shadow-lg transition cursor-pointer"
                  >
                    Update Book
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Add New Book
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Register a new catalog book.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Book Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. The Hobbit"
                    required
                    className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-655 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Author
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. J.R.R. Tolkien"
                    required
                    className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-655 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Price (₦)
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      required
                      className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-655 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-slate-350 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition"
                    >
                      <option value="">Select Category</option>
                      <option value="1">General</option>
                      <option value="2">Science and Technology</option>
                      <option value="3">Arts and History</option>
                      <option value="4">Philosophy</option>
                      <option value="5">Religion</option>
                      <option value="6">Politics</option>
                      <option value="7">Education</option>
                      <option value="8">Health</option>
                      <option value="9">Travel and Nature</option>
                      <option value="10">
                        Food, Lifestyle and General well-being
                      </option>
                      <option value="11">Sports</option>
                      <option value="12">Others</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    placeholder="Write a brief overview of the plot, style, and outline..."
                    required
                    className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm transition resize-none"
                  />
                </div>

                <div className="pt-2">
                  {user.isAllowed ? (
                    <button
                      type="submit"
                      className="w-full flex justify-center items-center px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/15 transition cursor-pointer"
                    >
                      Publish Entry
                    </button>
                  ) : (
                    <p
                      className="w-full flex justify-center items-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/15 transition "
                    >
                     Publish Blocked
                    </p>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right Side: Available Books Catalog */}

        {yourBooks && (
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <IoBookOutline className="w-6 h-6 text-indigo-400" />
              Catalog Listings
            </h2>

            {books?.length < 1 ? (
              <div className="p-12 text-center bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl space-y-4">
                <div className="p-4 w-fit bg-slate-950 border border-slate-850 rounded-2xl text-slate-500 mx-auto">
                  <IoBookOutline className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">
                    No Publications Found
                  </h3>
                  <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                    Hey! You have no books registered on this workspace yet. Add
                    a new book using the form on the left to start!
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.isArray(books) &&
                  books.map((book) => (
                    <div
                      key={book.id}
                      className="p-6 bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 hover:border-slate-700/60 rounded-3xl shadow-xl hover:scale-[1.01] hover:-translate-y-0.5 transition duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Title & Price Header */}
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-lg font-extrabold text-white leading-snug line-clamp-2">
                            {book.title}
                          </h3>
                          <span className="inline-flex items-center text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/35 px-2.5 py-1 rounded-full shadow-inner whitespace-nowrap">
                            ₦{Number(book.price).toLocaleString()}
                          </span>
                        </div>

                        {/* Author */}
                        <p className="text-xs text-indigo-400 font-semibold mt-1">
                          by {book.author}
                        </p>

                        {/* Category Label */}
                        {book.category && (
                          <div className="mt-3.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            <IoFolderOpenOutline className="w-3 h-3 text-slate-500" />
                            {book.category.name}
                          </div>
                        )}

                        {/* Description preview */}
                        <p className="text-slate-400 text-xs mt-4 leading-relaxed line-clamp-3">
                          {book.description || "No book summary was uploaded."}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="grid grid-cols-3 gap-2.5 pt-4 mt-6 border-t border-slate-850">
                        <Link
                          to={`/book/${book.id}`}
                          className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-950/60 hover:bg-slate-950 border border-slate-800 rounded-xl transition duration-200"
                        >
                          <IoEyeOutline className="w-4 h-4" />
                          <span>View</span>
                        </Link>

                        <button
                          onClick={() => {
                            setEditMode(true);
                            setBookId(book.id);
                            setAuthor(book.author);
                            setCategory(book.category.id);
                            setTitle(book.title);
                            setPrice(book.price);
                            setDescription(book.description);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold text-amber-400 hover:text-white bg-amber-950/20 hover:bg-amber-600 rounded-xl border border-amber-900/40 hover:border-transparent transition duration-200 cursor-pointer"
                        >
                          <IoCreateOutline className="w-4 h-4" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            setBookId(book.id);
                            setDeleted(true);
                          }}
                          className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold text-rose-450 hover:text-white bg-rose-950/20 hover:bg-rose-600 rounded-xl border border-rose-900/40 hover:border-transparent transition duration-200 cursor-pointer"
                        >
                          <IoTrashOutline className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
