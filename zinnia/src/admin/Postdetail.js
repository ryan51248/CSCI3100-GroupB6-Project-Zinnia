//hold detail of individual post 

import React from "react";
import moment from "moment";
import {Link,Navigate} from "react-router-dom"
import {deleteComment, deletePost} from "./deleteFunc"
class Postdetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {postId:this.props.match.params.postId,data:[],writer:{},comment:[],like:[],redirect:false}
        this.deletePost = this.deletePost.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
        //console.log(this.props.match.params)
        
    }
    componentDidMount(){
        fetch(`http://localhost:8080/post/${this.state.postId}`)
        .then(res=>res.json())
        .then(json=>{
            this.setState({data:json})
            //for test; can delete console log at final version 
            //console.log(this.state.data)
            this.setState({writer:json.writer})
            this.setState({comment:json.comment})
            this.setState({like:json.like})
        })
    }
    async deletePost(event){
        await deletePost(event.target.value);
        this.setState({redirect:true})
    }
    async deleteComment(event){
        await deleteComment(event.target.value);
        this.componentDidMount()
    }
    render(){
        return(
            <div className="container">
                <div className="d-flex justify-content-end">
                    <Link to="/admin/ManagePost">Back</Link>
                </div>
                <section id="post" className="border">
                    <div className="d-flex justify-content-between">
                        <h1 className="p-3">{this.state.data.title}</h1>
                        <button type="button" onClick={this.deletePost} value={this.state.data._id} className="btn-close btn-close-white" aria-label="Close"></button>
                    </div>
                    <div className="border-top border-bottom p-2">
                        <h2>{this.state.writer.username}</h2>
                        <p className="">{this.state.data.content}</p>
                        <p>Created at: {moment(this.state.data.createdAt).format("LLL")}
                        <i className="fa fa-thumbs-up fa-xs"> {this.state.like.length}</i></p>
                    </div>
                </section>    
                <br/>                            
                <h2 className="p-3 border-top">Comment</h2>

                {this.state.comment.map((comment,index)=>
                <div key ={index} className="border-top border-bottom p-2" >
                    <div className="d-flex justify-content-between">
                    <h4 className="font-weight-bold">{comment.commenter.username}</h4>
                    <button type="button" onClick={this.deleteComment} value={comment._id} className="btn-close btn-close-white btn-close-sm" aria-label="Close"></button>
                    </div>
                    <p>{comment.comment}</p>
                    <p className="">Created at: {moment(comment.createdAt).format("LLL")}
                    <i className="fa fa-thumbs-up fa-xs"> {comment.like.length}</i></p>
                    
                </div>
                )}
                {this.state.redirect?<Navigate to="/admin/ManagePost"/>:<></>}
            </div>
        );
    }
}
export default Postdetail;