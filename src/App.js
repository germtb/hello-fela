import React, { Component } from 'react'
import { connect } from 'react-fela'

const Countdown = ({ count, styles }) =>
	<div className={styles.counter}>
		{count}
	</div>

const StyledCountdown = connect({
	counter: ({ count }) => {
		const fontSize = 20 + 20 * (10 - count)

		return {
			fontSize: `${fontSize}px`,
			color: count > 5 ? 'black' : 'red'
		}
	}
})(Countdown)

class App extends Component {
	constructor() {
		super()
		this.state = { count: 10 }
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			this.setState({ count: this.state.count - 1 })
		}, 1000)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		const { styles } = this.props
		const { count } = this.state
		return (
			<div className={styles.app}>
				<button
					className={styles.reset}
					onClick={() => this.setState({ count: 10 })}
				>
					Reset
				</button>
				{count > 0
					? <StyledCountdown count={count} />
					: <div className={styles.result}>Dissapointment</div>}
			</div>
		)
	}
}

export default connect({
	app: () => ({
		display: 'flex',
		flexDirection: 'column',
		padding: '8px',
		alignItems: 'center',
		height: '100%',
		width: '100%',
		textAlign: 'center',
		backgroundColor: '#98FB98'
	}),
	reset: () => ({
		fontSize: '30px',
		width: '300px',
		height: '60px',
		marginBottom: '10px'
	}),
	result: () => ({
		fontSize: '50px'
	})
})(App)
