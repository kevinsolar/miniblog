import { Link } from "react-router";
import styles from "./PostDetails.module.css";

const PostDetail = ({ post }) => {
	return (
		<div className={styles.post_detail}>
			<div className={styles.img_wrapper}>
				<img src={post.img} alt={post.title} />
			</div>
			<div className={styles.body}>
				<h2>{post.title}</h2>
				<p className={styles.createdby}>{post.createdBy}</p>
				<div className={styles.tags}>
					{post.tagsArray.map((tag) => (
						<p key={tag}>
							<span>#</span>
							{tag}
						</p>
					))}
					<Link to={`/posts/${post.id}`} className="btn">
						Ler
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PostDetail;
