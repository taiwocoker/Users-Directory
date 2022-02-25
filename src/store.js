import { action, computed, makeObservable, observable } from "mobx";

class Store {
    users = [];
    filteredUsers = [];
    user = {};

    async setUsers() {
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await res.json();
            this.users = data.map((user) => {
                user.tag = ['react'];
                return user;
            });
            console.log('aa', this.users);
        } catch (error) {
            console.log(error)
        }            
    }

    setUser(currentUser) {
        this.user = currentUser;
    }

    addUserTag(userId, tag) {
        const user = this.users.find(({ id }) => userId === id )
        const existingTag = user.tag.indexOf(tag);
        if (existingTag === -1) {
            user.tag.push(tag);
        }
    }

    removeUserTag(userId, tagIndex) {
        const user = this.users.find(({ id }) => userId === id );
        console.log(userId, user.tag, tagIndex)
        user.tag = user.tag.filter((tag, index) => index !== tagIndex);
    }

    setFilteredUsers(filteredUsers) {
        this.filteredUsers = filteredUsers;
    }

    get getUsers() {
        return this.users;
    }

    constructor() {
        makeObservable(this, {
          users: observable,
          filteredUsers: observable,
          user: observable,
          setUser: action,
          setUsers: action,
          getUsers: computed,
          setFilteredUsers: action,
          addUserTag: action,
          removeUserTag: action,
        });
      }
}


export default new Store();
