import React from "react";
import UserService from "../services/user.service";

class profileLink extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            link: "",
        }
    }
    componentDidMount(){
        this.getProfileLink();
    }
    getProfileLink(){
        let profileLinkUrl = UserService.getProfileLink();
        this.setState({link: profileLinkUrl});
    }

    render(){
        return(
            <div>
               <p>{this.state.link}</p>
            </div>
        );
    }
}

export default profileLink;
