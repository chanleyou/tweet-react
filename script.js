class UserLine extends React.Component {
	render() {

		var user = this.props.user;
		var datetime = this.props.datetime;
		// use moment to convert this back into a JS datetime object maybe
	
		return (
			<p><strong>{user.name}</strong> <span className="text-secondary">@{user.screen_name} {datetime}</span></p>
		)
	}
}

class Media extends React.Component {
	render () {

		let entities = this.props.entities;

		if (entities.media) {
			return <img src={entities.media[0].media_url} />
		} else {
			return <span />
		}
	}
}

class Content extends React.Component {
	render() {

		var tweet = this.props.tweet;
		var urls = tweet.entities.urls;
		var media = tweet.entities.media;

		var newText = tweet.text;

		// entities substitutions
		// all of these should probably use entities.#.indices, but ohwell

		// url substitutions
		for (let i in urls) {
			newText = tweet.text.replace(urls[i].url, `<a href="${urls[i].expanded_url}">${urls[i].display_url}</a>`)
		}

		// media removal (picture goes in another component)
		if (media) {
			newText = newText.replace(media[0].url, "");
		}

		var newHTML = { __html: newText };

		return (
			<div>
				<p dangerouslySetInnerHTML={newHTML} />
			</div>
		)
	}
}

class InteractionLine extends React.Component {
	render() {

		var retweets = this.props.retweets;
		var favourites = this.props.favourites;

		return (
			<p>Retweets: {retweets} Likes: {favourites}</p>
		)
	}
}

class Tweets extends React.Component {
	render() {

		var tweets = this.props.tweets.map(tweet => {
			return (
				<div key={tweet.text}>
					<UserLine user={tweet.user} datetime={tweet.created_at} />
					<Content tweet={tweet} />
					<Media entities={tweet.entities} />
					<InteractionLine retweets={tweet.retweet_count} favourites={tweet.favorite_count} />
				</div>
			)
		})

		return (
			<div>
				{tweets}
			</div>
		)
	}
}


ReactDOM.render(
	<div>
		<Tweets tweets={tweets} />
	</div>,
	document.getElementById('root')
);


