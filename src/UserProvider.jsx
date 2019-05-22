import React from "react";
import serverUrl from "./url";

const UserContext = React.createContext("user");
export { UserContext };

class UserProvider extends React.Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null
  };
  login = (user, token) => {
    console.log(user, token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.setState({
      user,
      token
    });
  };
  render() {
    return (
      <UserContext.Provider
        value={{ user: this.state.user, login: this.login }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
