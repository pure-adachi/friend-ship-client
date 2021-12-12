import React, { Component } from "react";
import { Link } from "react-router-dom";
import WebAgent from "../../../utils/WebAgent";
import Video from "../../atoms/Video";
import Audio from "../../atoms/Audio";
import { WebRTCTypes } from "../../../types";

interface Props {
  currentUserId: string;
}

interface State {
  webAgent: WebAgent;
  ready: boolean;
  error: string;
  localStream: WebRTCTypes.Stream;
  peerConnections: WebRTCTypes.PeerConnections;
}

class WebRTCRoom extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      webAgent: new WebAgent(
        this.props.currentUserId,
        this.updateRTC.bind(this),
        this.setError.bind(this)
      ),
      ready: false,
      error: "",
      localStream: null,
      peerConnections: {},
    };
  }

  componentDidMount() {
    this.state.webAgent.setup().then(() => {
      this.setState({
        ready: true,
        localStream: this.state.webAgent.rtc.localStream,
      });
    });
  }

  componentWillUnmount() {
    this.state.webAgent.leave();
  }

  private updateRTC() {
    this.setState({
      peerConnections: this.state.webAgent.rtc.peerConnections,
    });
  }

  private setError(error: string) {
    this.setState({ error });
  }

  render() {
    if (!this.state) return <></>;
    if (this.state.error) return <>{this.state.error}</>;
    if (!this.state.ready) return <>準備中...</>;

    return (
      <>
        <div>WebRTCRoom</div>
        <Link
          to="/login"
          onClick={() => localStorage.removeItem("access_token")}
        >
          Back
        </Link>

        {this.state.localStream && <Video stream={this.state.localStream} />}

        {Object.keys(this.state.peerConnections).map((userGuid) => {
          const connection = this.state.peerConnections[userGuid];
          const videoStream = connection.videoStream;
          const audioStream = connection.audioStream;
          const volume = connection.volume;

          return (
            <div key={userGuid}>
              {videoStream && <Video stream={videoStream} />}
              {audioStream && <Audio stream={audioStream} volume={volume} />}
            </div>
          );
        })}
      </>
    );
  }
}

export default WebRTCRoom;
