import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import socket from "../socket";

export const storeContext = createContext();

export const StoreProvider = ({ children }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [joinedDate, setJoinedDate] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [everyBook, setEveryBook] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookId, setBookId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [userId, setUserId] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [title, setTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [adminDelete, setAdminDelete] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deletedUser, setDeletedUser] = useState(null);
  const [viewAccess, setViewAccess] = useState(null);
  const [viewUsers, setViewUsers] = useState(false);
  const [viewCategory, setViewCategory] = useState(false);
  const [bookAdmin, setBookAdmin] = useState(false);
  const [accessControl, setAccessControl] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [noticeBox, setNoticeBox] = useState(false);
  const [forgot, setforgot] = useState(false);


  // const [deleteBook, setDeleteBook] = useState(false);

  const apiurl = import.meta.env.VITE_API_URL;

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const [token, setToken] = useState(localStorage.getItem("accesstoken"));


  // useEffect(() => {
  //   try {
  //     const decode = token ? jwtDecode(token) : null;
  //     if (decode.isAdmin === true) {
  //       setIsAdmin(true);
  //       getAllUsers();
  //     }
  //   } catch (error) {
  //     setIsAdmin(false);
  //     console.log(error);
  //   }
  // }, []);
  useEffect(() => {
    socket.on("notification", (data) => {
      console.log(data);

      toast.success(data.title);

      // Update notification list
      fetchNotification();
      // Update unread count
      fetchUnreadCount();
    });

    return () => {
      socket.off("notification");
    };
  }, []);


  async function fetchNotification() {
    console.log("Fetching notifications...");

    const response = await fetch(`${apiurl}/notification`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.status);

    const data = await response.json();
    console.log(data);

    setNotifications(data.notifications);
  }


  async function fetchUnreadCount() {
    console.log("Fetching unread count...");

    const response = await fetch(`${apiurl}/notification/unread-count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.status);

    const data = await response.json();
    console.log(data);

    setUnreadCount(data.count);
  }


  useEffect(() => {
    try {
      const decode = token ? jwtDecode(token) : null;

      if (!token || decode.exp * 1000 < Date.now()) {
        setIsAuth(false);
        setIsAdmin(false);

        socket.disconnect();

        localStorage.removeItem("accesstoken");
      } else {
        setIsAuth(true);
        setIsAdmin(decode.isAdmin);

        if (decode.isAdmin) {
          getAllUsers();
          getAllCategory();
          getEveryBook();
        }

        if (!socket.connected) {
          socket.connect();
        }

        socket.emit("join", decode.sub);
      }
    } catch (error) {
      setIsAuth(false);
      setIsAdmin(false);

      socket.disconnect();

      localStorage.removeItem("accesstoken");
      console.log(error);
    }
  }, [token]);

  async function getAllUsers() {
    try {
      const response = await fetch(`${apiurl}/user/admin/fetchall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getEveryBook() {
    try {
      const response = await fetch(`${apiurl}/book/fetchevery`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setEveryBook(data.books);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getAllBooks() {
    try {
      const response = await fetch(`${apiurl}/book/fetchall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setBooks(data.books);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getAllCategory() {
    try {
      const response = await fetch(`${apiurl}/category/fetchall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getOneBook(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiurl}/book/single/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setBooks(data.books);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteOneBook() {
    try {
      setIsLoading(true);
      // setEditMode(false);

      const response = await fetch(`${apiurl}/book/delete/${bookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      // setEditMode(false);

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);

        console.log(data);
        // setBooks(data.books);
      }
    } catch (error) {
      console.log(error);
    } finally {
      getAllBooks();
      // setEditMode(false);
    }
  }
  async function adminDeleteOneBook() {
    try {
      setIsLoading(true);
      // setEditMode(false);

      const response = await fetch(`${apiurl}/book/admin/delete/${bookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      // setEditMode(false);

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        await getAllUsers();
        console.log(data);
        // setBooks(data.books);
      } else if (response.status === 403 || 404) {
        const data = await response.json();
        toast.error(data.message);

        // setSelectedUser(user);

        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
    // finally {
    //   getAllUsers();
    //   // setEditMode(false);
    // }
  }
  async function deleteOneUser() {
    try {
      setIsLoading(true);
      // setEditMode(false);

      const response = await fetch(`${apiurl}/user/admin/delete/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      // setEditMode(false);

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);

        console.log(data);
        // setBooks(data.books);
      }
    } catch (error) {
      console.log(error);
    } finally {
      getAllUsers();
      // setViewUsers(true);

      // setEditMode(false);
    }
  }
  async function makeAdmin(id) {
    try {
      setIsLoading(true);
      // setEditMode(false);

      const response = await fetch(`${apiurl}/user/admin/useraccess/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isAdmin: true,
        }),
      });
      setIsLoading(false);

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);

        await getAllUsers();

        setViewAccess((prev) => ({
          ...prev,
          isAdmin: true,
        }));

        console.log(data);
      }
    } catch (error) {
      console.log(error);
      console.log(token);
    }
  }

  async function removeAdmin(id) {
    try {
      setIsLoading(true);
      // setEditMode(false);

      const response = await fetch(`${apiurl}/user/admin/useraccess/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isAdmin: false,
        }),
      });
      setIsLoading(false);
      // setEditMode(false);

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);

        await getAllUsers();

        setViewAccess((prev) => ({
          ...prev,
          isAdmin: false,
        }));

        console.log(data);
        // setBooks(data.books);
      }
    } catch (error) {
      console.log(error);
    }
  }


  async function notification(id) {
    try {
      setIsLoading(true);
      // setEditMode(false);    
      const response = await fetch(`${apiurl}/notification/restricted/${id} `, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }

  }

  async function allowAccess(id) {
    try {
      setIsLoading(true);
      // setEditMode(false);

      const response = await fetch(`${apiurl}/user/admin/useraccess/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isAllowed: true,
        }),
      });
      setIsLoading(false);
      // setEditMode(false);

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);

        await getAllUsers();

        setViewAccess((prev) => ({
          ...prev,
          isAllowed: true,
        }));

        console.log(data);
        // setBooks(data.books);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeAccess(id) {
    try {
      setIsLoading(true);
      // setEditMode(false);

      const response = await fetch(`${apiurl}/user/admin/useraccess/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isAllowed: false,
        }),
      });
      setIsLoading(false);
      // setEditMode(false);

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);

        await getAllUsers();

        setViewAccess((prev) => ({
          ...prev,
          isAllowed: false,
        }));

        console.log(data);
        // setBooks(data.books);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createBookAdmin(id) {
    try {
      setIsLoading(true);
      // console.log(title, author, description,price, category)
      const response = await fetch(`${apiurl}/book/admin/create/${id}`, {
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
      } else if (response.status === 403) {
        const data = await response.json();
        toast.error(data.message);

        // setSelectedUser(user);

        console.log(data);
      }
    } catch (error) {
      toast.error("Failed to create book, Try again");
      console.log(error);
      setIsLoading(false);
    } finally {
      getAllUsers();
    }
  }
  async function updateBookAdmin(id) {
    try {
      setIsLoading(true);
      // console.log(title, author, description,price, category)
      const response = await fetch(`${apiurl}/book/admin/update/${id}`, {
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
      } else if (response.status === 403) {
        const data = await response.json();
        toast.error(data.message);

        // setSelectedUser(user);

        console.log(data);
      }
    } catch (error) {
      toast.error("Failed to create book, Try again");
      console.log(error);
      setIsLoading(false);
    } finally {
      getAllUsers();
    }
  }

  async function fetchUser() {
    try {
      setIsLoading(true);

      const response = await fetch(`${apiurl}/user/single`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      // setEditMode(false);

      if (response.ok) {
        const data = await response.json();
        // setProfile(data.profile);
        setUser(data.user);

        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchProfile() {
    try {
      setIsLoading(true);

      const response = await fetch(`${apiurl}/profile/single`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      // setEditMode(false);

      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile);

        console.log(data);
        // setBooks(data.books);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //exporting states/functions/data
  const contextObj = {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    bio,
    setBio,
    joinedDate,
    setJoinedDate,
    lastUpdate,
    setLastUpdate,
    isLoading,
    setIsLoading,
    apiurl,
    isAuth,
    setIsAuth,
    token,
    setToken,
    getAllBooks,
    getOneBook,
    books,
    bookId,
    setBookId,
    categoryId,
    setCategoryId,
    userId,
    setUserId,
    books,
    setBooks,
    authLoading,
    setAuthLoading,
    author,
    title,
    setTitle,
    setAuthor,
    price,
    setPrice,
    description,
    setDescription,
    category,
    setCategory,
    categoryName,
    setCategoryName,
    editMode,
    setEditMode,
    deleteOneBook,
    deleted,
    // setDeleteBook,
    setDeleted,
    logOut,
    setLogOut,
    profile,
    setProfile,
    user,
    setUser,
    fetchUser,
    fetchProfile,
    isAdmin,
    setIsAdmin,
    users,
    setUsers,
    deletedUser,
    setDeletedUser,
    selectedUserId,
    setSelectedUserId,
    deleteOneUser,
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
    makeAdmin,
    createBookAdmin,
    updateBookAdmin,
    setBookAdmin,
    bookAdmin,
    adminDeleteOneBook,
    adminDelete,
    setAdminDelete,
    setViewCategory,
    viewCategory,
    getAllCategory,
    unreadCount,
    setUnreadCount,
    notifications,
    setNotifications,
    noticeBox,
    setNoticeBox,
    everyBook,
    forgot,
    setforgot,
    confirmPassword,
    setConfirmPassword,
  };
  return (
    <storeContext.Provider value={contextObj}>{children}</storeContext.Provider>
  );
};
