import React,{useState,useEffect} from "react";
import api from "../../api";
import "./users.css";


  
const UsersList = [
  {
    id: 1,
    userName: "Adam",
    isAdmin: true,
  },
  {
    id: 2,
    userName: "mero",
    isAdmin: false,
  },
  {
    id: 3,
    userName: "ali",
    isAdmin: false,
  },
  {
    id: 4,
    userName: "omar",
    isAdmin: false,
  },
];

const Users = () => {
    const [fruits, setFruits] = useState([]);
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [isAdmin,setIsAdmin]=useState(false)


    const fetchFruits = async () => {
        try {
          const response = await api.get('/users/');
          setFruits(response.data);
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching fruits", error);
        }
      };
    
      const submitHandler=(e)=>{
        e.preventDefault();
        addFruit(userName,isAdmin,password)
        setPassword("")
        setUserName('')
        setIsAdmin(false)
      }

      const addFruit = async (fruitName, isAdmin, password) => {
        try {
          await api.post('/user', { username: fruitName, is_admin: isAdmin, password: password });
          fetchFruits();  // Refresh the list after adding a fruit
        } catch (error) {
          console.error("Error adding fruit", error);
        }
      };
    
    //   const DeleteUser = async (username) => {
    //     try {
    //       await api.delete(`/users/${username}`);
    //       fetchFruits();  // Refresh the list after adding a fruit
    //     } catch (error) {
    //       console.error("Error deleting user", error);
    //     }
    //   };
    
      useEffect(() => {
        fetchFruits();
      }, []);
    

  return (
    <div className="app__users">
      <div className="app__users__list">
        {fruits.map((user,i) => (
          <h2 key={i} className={`${user.is_admin ? "admin" : ""}`}>{user.username}</h2>
        ))}
      </div>

      <form className="app__users__form" onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">UserName</label>
          <input value={userName} id="username" type="text" required onChange={(e)=>{setUserName(e.target.value)}}/>
        </div>

        <div>
          <label htmlFor="Password">Password</label>
          <input value={password} id="Password" type="text" required onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <div>
          <label htmlFor="isAdmin">is Admin</label>
          <input checked={isAdmin} id="isAdmin" type="checkbox" onChange={(e) => setIsAdmin(e.target.checked)} />
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Users;
