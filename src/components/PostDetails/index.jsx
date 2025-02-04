import { Link } from "react-router";
import styles from "./PostDetails.module.css";

const PostDetail = ({ post }) => {
	return (
		<div>
			<img src={post.img} alt={post.title} />
			<h2>{post.title}</h2>
			<p>{post.createdBy}</p>
			<div>
				{post.tagsArray.map((tag) => (
					<p key={tag}>
						<span>#</span>
						{tag}
					</p>
				))}
            <Link to={`/posts/${post.id}`} className="btn">Ler</Link>
			</div>
		</div>
	);
};

export default PostDetail;
