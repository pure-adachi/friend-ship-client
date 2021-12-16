import React, { Component } from "react";
import { Link } from "react-router-dom";
import WebAgent from "../../../utils/WebAgent";
import OverlayJoin from "../../atoms/OverlayJoin";
import SetUserMedia from "../../atoms/SetUserMedia";
import Button from "../../atoms/Button";
import Video from "../../atoms/Video";
import Audio from "../../atoms/Audio";
import { WebRTCTypes } from "../../../types";

interface Props {
  currentUserId: string;
  currentUserName: string;
}

interface State {
  webAgent: WebAgent;
  leave: boolean;
  setup: boolean;
  ready: boolean;
  error: string;
  audioInputId: string;
  audioOutputId: string;
  videoInputId: string;
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
      leave: true,
      setup: false,
      ready: false,
      error: "",
      audioInputId: "",
      audioOutputId: "",
      videoInputId: "",
      localStream: null,
      peerConnections: {},
    };
  }

  componentWillUnmount() {
    this.state.webAgent.leave();
  }

  private start() {
    this.state.webAgent.setup().then(() => {
      this.setState({
        leave: false,
        setup: true,
      });
    });
  }

  private joinRoom(
    audioInputId: string,
    audioOutputId: string,
    videoInputId: string
  ) {
    this.state.webAgent.rtc
      .changeDevise({ audioInputId, videoInputId })
      .then((localStream) => {
        this.setState({
          setup: false,
          ready: true,
          audioInputId,
          audioOutputId,
          videoInputId,
          localStream,
        });

        this.state.webAgent.join();
      });
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
    if (this.state.leave) {
      return (
        <OverlayJoin>
          <Button className="py-4 px-5 rounded" onClick={this.start.bind(this)}>
            スタート
          </Button>
        </OverlayJoin>
      );
    }
    if (this.state.setup) {
      return (
        <OverlayJoin>
          <SetUserMedia joinRoom={this.joinRoom.bind(this)} />
        </OverlayJoin>
      );
    }
    if (!this.state.ready) return <>準備中...</>;

    return (
      <div className="flex flex-col min-h-screen h-full bg-gray-100">
        <header className="p-3 bg-red-500 text-white">
          <div className="flex items-center">
            <div className="flex-none text-2xl">Friend Ship</div>
            <div className="flex-auto">
              <Link
                to="/login"
                className="bg-gray-500 text-gray-50 px-3 py-1 rounded float-right"
                onClick={() => localStorage.removeItem("access_token")}
              >
                退出
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <section className="container mx-auto p-4">
            <div className="flex flex-wrap justify-center">
              {this.state.localStream && (
                <Video stream={this.state.localStream} />
              )}

              {Object.keys(this.state.peerConnections).map((userGuid) => {
                const connection = this.state.peerConnections[userGuid];
                const videoStream = connection.videoStream;
                const audioStream = connection.audioStream;
                const volume = connection.volume;

                return (
                  <div key={userGuid}>
                    {videoStream && <Video stream={videoStream} />}
                    {audioStream && (
                      <Audio
                        stream={audioStream}
                        volume={volume}
                        audioOutputId={this.state.audioOutputId}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default WebRTCRoom;
