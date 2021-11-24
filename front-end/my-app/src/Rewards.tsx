import React from 'react';
import './scss/App.scss';
import './scss/Rewards.scss';
import { Button } from 'reactstrap';
import { Donation, User } from './redux/rewards/state';
import { IRootState, ThunkDispatch } from './redux/store';
import { fetchRewards, exchangeRewardsThunk } from './redux/rewards/thunk';
import { connect } from 'react-redux';
import AlertStyle from './AlertStyle';
import 'rc-progress/assets/index.css';

interface IRewardsProps {
  alertmsg: string;
  users: User[],
  donation: Donation[],
  fetchRewards: () => void;
  exchangeRewardsThunk: (donationId: number, progress: number) => void;
}

interface IRewardsState {
  progressTransform: string;
  progressBgColor: string;
  progressBackColor: string;
  progressWaterColor: string;
  progressPercentage: number;
  progressPercentColor: string;
  progressLevel:string;
  count: number;
}


class Rewards extends React.Component<IRewardsProps, IRewardsState>{
  private interval: any;

  constructor(props: IRewardsProps) {
    super(props);
    this.state = {
      progressTransform: 'translate(0, 0)',
      //cfc0aa
      progressBackColor: "#84624d",
      progressBgColor: '#F9F6F1',//brown
      progressWaterColor: '#290706',
      progressPercentColor: '#cfc0aac4',
      progressLevel:'',

      // progressBackColor: "#e72b38",
      // progressBgColor: '#f8f5f6',//pink
      // progressWaterColor: '#e5a4bc',

      // progressBackColor: "#BE8808",
      // progressBgColor: '#F7EFDB',
      // progressWaterColor: '#F2C043',
      // progressPercentColor: 'rgba(0, 0, 0, 0.543)',

      progressPercentage: 0,
      count: 0
    };
  }


  async componentDidMount() {
    await this.props.fetchRewards();
    if (this.props.users && this.props.users.length > 0) {

      if (Math.ceil(this.props.users[0].progress / 100) === 1) {
        this.setState({
          progressPercentage: this.props.users[0].progress,
          progressTransform: 'translate(0,' + (100 - this.props.users[0].progress) + '%)',
          progressLevel:'Americano'
        })
      } else if (Math.ceil(this.props.users[0].progress / 100) === 2) {
        this.setState({
          progressPercentage: this.props.users[0].progress - 100,
          progressTransform: 'translate(0,' + (200 - this.props.users[0].progress) + '%)',
          progressBackColor: "#e72b38",
          progressBgColor: '#f8f5f6',//pink
          progressWaterColor: '#e5a4bc',
          progressLevel:'Flamingo'
        })
      } else if (Math.ceil(this.props.users[0].progress / 100) === 3) {
        this.setState({
          progressPercentage: this.props.users[0].progress - 200,
          progressTransform: 'translate(0,' + (300 - this.props.users[0].progress) + '%)',
          progressBackColor: "#BE8808",
          progressBgColor: '#F7EFDB',//gold
          progressWaterColor: '#F2C043',
          progressPercentColor: 'rgba(0, 0, 0, 0.543)',
          progressLevel:'Gold'
        })
      }

    }

  }

  private exchange = async (donationId: number, progress: number) => {
    if(this.props.users[0].point > 99){

    await this.props.exchangeRewardsThunk(donationId, progress);
    // let cnt:any  = document.getElementById("count");
    // let water:any = document.getElementById("water");
    // let percent = cnt.innerText;
    if (Math.ceil(this.props.users[0].progress / 100) <= 1 && this.props.users[0].progress < 100 ) {
      // if
      this.interval = setInterval(() => {
        this.setState({ count: this.state.count + 1 }, () => {
          this.setState({
            progressPercentage: this.state.count,
            progressTransform: 'translate(0,' + (100 - this.state.count) + '%)',
          })

          if (this.props.users[0].progress === this.state.count) {
            this.setState({ count: 0 })
            clearInterval(this.interval);
          }
        })
      }, 60);
    } else if (Math.ceil((this.props.users[0].progress) / 100) >= 3 || this.props.users[0].progress === 200) {
      this.setState({ count: 200 })
      this.interval = setInterval(() => {
        this.setState({ count: this.state.count + 1 }, () => {
          this.setState({
            progressPercentage: this.state.count - 200,
            progressTransform: 'translate(0,' + (300 - this.state.count) + '%)',
            progressBackColor: "#BE8808",
            progressBgColor: '#F7EFDB',//gold
            progressWaterColor: '#F2C043',
            progressPercentColor: 'rgba(0, 0, 0, 0.543)',
            progressLevel:'Gold'
          })

          if (this.props.users[0].progress === this.state.count) {
            this.setState({ count: 200 })
            clearInterval(this.interval);
          }
        })
      }, 60);
    } else if (Math.ceil((this.props.users[0].progress) / 100) === 2 || this.props.users[0].progress === 100) {
      this.setState({ count: 100 })
      this.interval = setInterval(() => {
        this.setState({ count: this.state.count + 1 }, () => {
          this.setState({
            progressPercentage: this.state.count - 100,
            progressTransform: 'translate(0,' + (200 - this.state.count) + '%)',
            progressBackColor: "#e72b38",
            progressBgColor: '#f8f5f6',//pink
            progressWaterColor: '#e5a4bc',
            progressLevel:'Flamingo'
          })

          if (this.props.users[0].progress === this.state.count) {
            this.setState({ count: 100 })
            clearInterval(this.interval);
          }
        })
      }, 60);
    }
  }else{
    alert('Purchase to earn points!')
  }
  }


  public render() {
    const { progressTransform, 
            progressBgColor, 
            progressPercentage, 
            progressWaterColor, 
            progressBackColor, 
            progressPercentColor,
            progressLevel } = this.state;

    return (
      <div className="rewards">
        <div className="rewardsLoggedIn">
          <div className="myPoints">
            {this.props.users.map(user => (<div key={user.id} className="pointsStyle"> <div className="points">{user.point} </div> <p>points to redeem</p></div>))}
          </div>

          <div className="progressWrap">
            <p>Coffee level: {progressLevel} </p>
            {/* {this.props.users.map(user => (<Progress className="progress" animated color="success" value={user.progress} key={user.id} />))} */}
            <div className="circleProgress">
              {/* <Circle percent={90} 
             strokeWidth={4}
             trailWidth={4} /> */}

              <svg version="1.1" x="0px" y="0px" style={{ display: "none" }}>
                <symbol id="wave">
                  <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
                  <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
                  <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
                  <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
                </symbol>
              </svg>

              {/* <div id="circle"></div> */}
              <div className="box" style={{ backgroundColor: progressBgColor }}>

                <div className="percent" style={{ color: progressPercentColor }}>
                  <div className="percentNum" id="count">{progressPercentage}</div>
                  <div className="percentB">%</div>
                </div>
                <div id="water" className="water" style={{ transform: progressTransform, backgroundColor: progressWaterColor }}>
                  <svg viewBox="0 0 560 20" className="water_wave water_wave_back" style={{ fill: progressBackColor }}>
                    <use xlinkHref="#wave"></use>
                  </svg>
                  <svg viewBox="0 0 560 20" className="water_wave water_wave_front" style={{ fill: progressWaterColor }}>
                    <use xlinkHref="#wave"></use>
                  </svg>
                </div>
              </div>
            </div>




          </div>

          <div className="donationWrap">


            {this.props.donation.map(donate =>
              (<Button className="donation" key={donate.id}
                onClick={() => this.exchange(donate.id, this.props.users[0].progress)}>
                <img src={require(`./donation-imgs/${donate.img}`)} alt="organization-icon" />
                <div className="donationContent">
              <div className="HKD"> HKD {(JSON.stringify(donate.amount).slice(1, 4))} </div> 
                <div className="for">for</div> 
               <div className="donationOrg">{donate.organization}</div>
                </div>
                <p>100 points to redeem</p>
              </Button>)
            )}

          </div>
          {this.props.alertmsg ? <AlertStyle /> : ""}

        </div>




      </div>
    )
  }
}




const mapStateToProps = (state: IRootState) => {
  return {
    users: state.rewards.users,
    donation: state.rewards.donation,
    alertmsg: state.alert.alertmsg
  }
}


const mapDispatchToProps = (dispatch: ThunkDispatch) => {
  return {

    fetchRewards: () => dispatch(fetchRewards()),
    exchangeRewardsThunk: (donationId: number, progress: number) => dispatch(exchangeRewardsThunk(donationId, progress))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rewards);
