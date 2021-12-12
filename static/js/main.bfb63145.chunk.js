(this["webpackJsonpfriend-ship-client"]=this["webpackJsonpfriend-ship-client"]||[]).push([[0],{86:function(e,n,t){},88:function(e,n,t){"use strict";t.r(n);var c,i,o,r=t(1),s=t.n(r),a=t(47),l=t.n(a),u=t(30),d=t(5),h=t(99),b=t(13),f=t(52),v=t(100),j=t(93),p=t(67),g=(t(98),{}),O=Object(v.a)(c||(c=Object(f.a)(["\n    mutation login($loginid: String!, $password: String!) {\n  login(input: {loginid: $loginid, password: $password}) {\n    user {\n      accessToken {\n        token\n      }\n    }\n    result\n  }\n}\n    "])));var m=Object(v.a)(i||(i=Object(f.a)(["\n    query viewer {\n  viewer {\n    id\n    name\n  }\n}\n    "])));var y=Object(v.a)(o||(o=Object(f.a)(["\n    query viewerId {\n  viewer {\n    id\n  }\n}\n    "])));function x(e){var n=Object(b.a)(Object(b.a)({},g),e);return p.a(y,n)}var C=t(3),k=function(e){var n=e.children,t=x({fetchPolicy:"network-only"}),c=t.loading,i=t.data,o=null===i||void 0===i?void 0:i.viewer;return c?Object(C.jsx)(C.Fragment,{children:"Loading ..."}):o?Object(C.jsx)(C.Fragment,{children:n}):Object(C.jsx)(d.a,{to:"/login"})},w=function(e){var n=e.children;return Object(C.jsx)(k,{children:Object(C.jsx)("div",{className:"main",children:n})})},S=t(9),T=t(10),U=t(24),A=t(27),I=t(28),D=t(58),F=t.n(D),N=t(68),M=function(){function e(n,t,c){Object(S.a)(this,e),this.publicCable=null,this.myCable=null,this.localStream=null,this.peerConnections={},this.connectionConfig={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun2.l.google.com:19302"}]},this.currentUserId=void 0,this.isEnableAudio=!0,this.isEnableVideo=!0,this.handleUpdate=void 0,this.handleError=void 0,this.currentUserId=n,this.handleUpdate=t,this.handleError=c}return Object(T.a)(e,[{key:"setup",value:function(){var e=this;return new Promise(function(){var n=Object(N.a)(F.a.mark((function n(t){return F.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,navigator.mediaDevices.getUserMedia({audio:e.isEnableAudio,video:e.isEnableVideo}).then((function(n){e.localStream=n,t()})).catch((function(n){e.handleError(n.message)}));case 2:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())}},{key:"connect",value:function(e){var n=this,t="channel-".concat(this.currentUserId,"_").concat(e);this.peerConnections[e]=this.initPeerConnection(e,t,(function(t){var c;null===(c=n.myCable)||void 0===c||c.send("offer",{sdp:t,receiverGuid:e})})),this.createOffer(e)}},{key:"disconnect",value:function(e){this.peerConnections[e]&&(this.peerConnections[e].channel.close(),delete this.peerConnections[e])}},{key:"setOffer",value:function(e,n){var t=this;this.peerConnections[e]&&this.disconnect(e);var c=new RTCSessionDescription({type:"offer",sdp:n}),i="channel-".concat(e,"_").concat(this.currentUserId);this.peerConnections[e]=this.initPeerConnection(e,i,(function(n){var c;null===(c=t.myCable)||void 0===c||c.send("answer",{sdp:n,receiverGuid:e})})),this.peerConnections[e].connection.setRemoteDescription(c).then((function(){t.createAnswer(e)}))}},{key:"setAnswer",value:function(e,n){var t=this,c=new RTCSessionDescription({type:"answer",sdp:n});this.peerConnections[e].connection.setRemoteDescription(c).catch((function(n){console.log("error setRemoteDescription",n,t.peerConnections[e])}))}},{key:"initPeerConnection",value:function(e,n,t){var c=this,i=new RTCPeerConnection(this.connectionConfig),o=i.createDataChannel(n);return i.onicecandidate=function(e){var n;!e.candidate&&(null===(n=i.localDescription)||void 0===n?void 0:n.sdp)&&t(i.localDescription.sdp)},"VXNlci0y"===e&&(i.onnegotiationneeded=function(n){console.log("onnegotiationneeded",n),c.peerConnections[e].connection.localDescription&&c.peerConnections[e].connection.remoteDescription&&(console.log("onnegotiationneeded add track",n),c.createOffer(e).then((function(n){var t=JSON.stringify(n);c.peerConnections[e].channel.send(t)})))}),i.ontrack=function(n){console.log("ontrack",n);var t=n.streams[0],i=n.track;"video"===i.kind?c.peerConnections[e].videoStream=t:"audio"===i.kind&&(c.peerConnections[e].audioStream=t),c.handleUpdate()},i.ondatachannel=function(n){console.log("ondatachannel",n),c.peerConnections[e].channel=n.channel,c.addVideoTrack(e),c.addAudioTrack(e)},o.onopen=function(){console.log("datachannel open")},o.onclose=function(){console.log("datachannel close")},o.onerror=function(e){console.log("datachannel error",e)},o.onmessage=function(n){var t=n.data,i=JSON.parse(t);"text"===i.type?console.log("onmessage text",t):"offer"===i.type?(console.log("onmessage offer"),c.peerConnections[e].connection.setRemoteDescription(i).then((function(){console.log("create answer"),c.createAnswer(e).then((function(n){console.log("created answer");var t=JSON.stringify(n);c.peerConnections[e].channel.send(t)}))}))):"answer"===i.type&&(console.log("onmessage answer"),c.peerConnections[e].connection.setRemoteDescription(i))},{connection:i,channel:o,volume:.5}}},{key:"createOffer",value:function(e){var n=this;return this.peerConnections[e].connection.createOffer({}).then((function(t){return n.peerConnections[e].connection.setLocalDescription(t),t}))}},{key:"createAnswer",value:function(e){var n=this;return this.peerConnections[e].connection.createAnswer({}).then((function(t){return n.peerConnections[e].connection.setLocalDescription(t),t}))}},{key:"addVideoTrack",value:function(e){if(this.localStream){var n=this.localStream.getVideoTracks()[0];this.peerConnections[e].connection.addTrack(n,this.localStream)}}},{key:"addAudioTrack",value:function(e){if(this.localStream){var n=this.localStream.getAudioTracks()[0];this.peerConnections[e].connection.addTrack(n,this.localStream)}}}]),e}(),P=M,R=t(69),E=t.n(R),_=function(){function e(n){Object(S.a)(this,e),this.rtc=void 0,this.subscriptions=void 0,this.cable=void 0,this.currentUserId=void 0,this.webSocketUrl="".concat("https://adachi-friend-ship-server.herokuapp.com","/cable?access_token=").concat(localStorage.getItem("access_token")),this.rtc=null,this.currentUserId=n,this.subscriptions=E.a.createConsumer(this.webSocketUrl).subscriptions,this.cable=null}return Object(T.a)(e,[{key:"disconnect",value:function(){var e;null===(e=this.cable)||void 0===e||e.unsubscribe()}},{key:"notifyOffline",value:function(){var e;null===(e=this.cable)||void 0===e||e.perform("offline",{})}}]),e}(),L=function(e){Object(A.a)(t,e);var n=Object(I.a)(t);function t(){return Object(S.a)(this,t),n.apply(this,arguments)}return Object(T.a)(t,[{key:"setup",value:function(){var e=this;return new Promise((function(n){e.cable=e.subscriptions.create("PostChannel",{connected:function(){n()},received:function(n){e.handleMessage(n)},disconnected:function(){e.notifyOffline()}})}))}},{key:"notifyOnline",value:function(){var e;null===(e=this.cable)||void 0===e||e.perform("online",{})}},{key:"handleMessage",value:function(e){e.online?this.handleOnlineMessage(e.online):e.offline&&this.handleOfflineMessage(e.offline)}},{key:"handleOnlineMessage",value:function(e){var n,t=e.user_guid;this.currentUserId!==t&&(console.log("".concat(t," \u304c\u30aa\u30f3\u30e9\u30a4\u30f3")),null===(n=this.rtc)||void 0===n||n.connect(t))}},{key:"handleOfflineMessage",value:function(e){var n,t=e.user_guid;this.currentUserId!==t&&(console.log("".concat(t," \u304c\u30aa\u30d5\u30e9\u30a4\u30f3")),null===(n=this.rtc)||void 0===n||n.disconnect(t))}}]),t}(_),V=L,J=function(e){Object(A.a)(t,e);var n=Object(I.a)(t);function t(){return Object(S.a)(this,t),n.apply(this,arguments)}return Object(T.a)(t,[{key:"setup",value:function(){var e=this;return new Promise((function(n){e.cable=e.subscriptions.create("UserChannel",{connected:function(){n()},received:function(n){e.handleMessage(n)},disconnected:function(){e.notifyOffline()}})}))}},{key:"send",value:function(e,n){var t;null===(t=this.cable)||void 0===t||t.perform(e,n)}},{key:"handleMessage",value:function(e){e.offer?this.handleOfferMessage(e.offer):e.answer&&this.handleAnswerMessage(e.answer)}},{key:"handleOfferMessage",value:function(e){var n,t=e.sdp,c=e.sender_guid;console.log("offer\u53d7\u4fe1"),null===(n=this.rtc)||void 0===n||n.setOffer(c,t)}},{key:"handleAnswerMessage",value:function(e){var n,t=e.sdp,c=e.sender_guid;console.log("answer\u53d7\u4fe1"),null===(n=this.rtc)||void 0===n||n.setAnswer(c,t)}}]),t}(_),$=J,q=function(){function e(n,t,c){Object(S.a)(this,e),this.rtc=void 0,this.publicCable=void 0,this.myCable=void 0,this.rtc=new P(n,t,c),this.publicCable=new V(n),this.myCable=new $(n),this.rtc.publicCable=this.publicCable,this.rtc.myCable=this.myCable,this.publicCable.rtc=this.rtc,this.myCable.rtc=this.rtc}return Object(T.a)(e,[{key:"leave",value:function(){this.publicCable.disconnect(),this.myCable.disconnect()}},{key:"setup",value:function(){var e=this;return Promise.all([this.rtc.setup(),this.publicCable.setup(),this.myCable.setup()]).then((function(){e.publicCable.notifyOnline()}))}}]),e}(),B=function(e){var n=e.stream,t=Object(r.useRef)(null);return Object(r.useEffect)((function(){return t.current&&(t.current.srcObject=n,t.current.play(),t.current.muted=!0,t.current.volume=0),function(){return n.getTracks().forEach((function(e){return e.stop()}))}}),[n]),Object(C.jsx)("video",{ref:t,autoPlay:!0,playsInline:!0})},G=function(e){var n=e.stream,t=e.volume,c=Object(r.useRef)(null);return Object(r.useEffect)((function(){c.current&&(c.current.srcObject=n,c.current.play(),c.current.volume=t)}),[n,t]),Object(C.jsx)("audio",{ref:c,autoPlay:!0,controls:!0})},W=function(e){Object(A.a)(t,e);var n=Object(I.a)(t);function t(e){var c;return Object(S.a)(this,t),(c=n.call(this,e)).state={webAgent:new q(c.props.currentUserId,c.updateRTC.bind(Object(U.a)(c)),c.setError.bind(Object(U.a)(c))),ready:!1,error:"",localStream:null,peerConnections:{}},c}return Object(T.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.state.webAgent.setup().then((function(){e.setState({ready:!0,localStream:e.state.webAgent.rtc.localStream})}))}},{key:"componentWillUnmount",value:function(){this.state.webAgent.leave()}},{key:"updateRTC",value:function(){this.setState({peerConnections:this.state.webAgent.rtc.peerConnections})}},{key:"setError",value:function(e){this.setState({error:e})}},{key:"render",value:function(){var e=this;return this.state?this.state.error?Object(C.jsx)(C.Fragment,{children:this.state.error}):this.state.ready?Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)("div",{children:"WebRTCRoom"}),Object(C.jsx)(u.b,{to:"/login",onClick:function(){return localStorage.removeItem("access_token")},children:"Back"}),this.state.localStream&&Object(C.jsx)(B,{stream:this.state.localStream}),Object.keys(this.state.peerConnections).map((function(n){var t=e.state.peerConnections[n],c=t.videoStream,i=t.audioStream,o=t.volume;return Object(C.jsxs)("div",{children:[c&&Object(C.jsx)(B,{stream:c}),i&&Object(C.jsx)(G,{stream:i,volume:o})]},n)}))]}):Object(C.jsx)(C.Fragment,{children:"\u6e96\u5099\u4e2d..."}):Object(C.jsx)(C.Fragment,{})}}]),t}(r.Component),X=function(){var e,n,t=function(e){var n=Object(b.a)(Object(b.a)({},g),e);return p.a(m,n)}({fetchPolicy:"network-only"}),c=t.loading,i=t.data,o=null===i||void 0===i||null===(e=i.viewer)||void 0===e?void 0:e.id,r=null===i||void 0===i||null===(n=i.viewer)||void 0===n?void 0:n.name;return c?Object(C.jsx)(C.Fragment,{children:"Loading ..."}):o?Object(C.jsxs)("div",{children:[Object(C.jsxs)("div",{children:[r,": ",o]}),Object(C.jsx)("div",{children:Object(C.jsx)(W,{currentUserId:o})})]}):Object(C.jsx)(C.Fragment,{children:"Failed"})},z=function(){return Object(C.jsx)(w,{children:Object(C.jsx)(X,{})})},H=t(12),K=t(59),Q=t(60),Y=t(44),Z=function(e){return Object(C.jsx)("input",Object(b.a)({type:"text"},e))},ee=function(e){return Object(C.jsx)("input",Object(b.a)({type:"password"},e))},ne=function(){var e=Object(d.g)(),n=Object(r.useState)(),t=Object(H.a)(n,2),c=t[0],i=t[1],o=Object(r.useState)(),s=Object(H.a)(o,2),a=s[0],l=s[1],u=function(e){var n=Object(b.a)(Object(b.a)({},g),e);return j.a(O,n)}({update:function(n,t){var c,i=t.data,o=null===i||void 0===i?void 0:i.login,r=null===o||void 0===o?void 0:o.user,s=null===r||void 0===r||null===(c=r.accessToken)||void 0===c?void 0:c.token;(null===o||void 0===o?void 0:o.result)&&s?(Y.b.success("Successful login"),localStorage.setItem("access_token",s),e("/")):Y.b.error("Login failed")},variables:{loginid:c||"",password:a||""}}),h=Object(H.a)(u,2),f=h[0],v=h[1].loading;return Object(C.jsx)("div",{className:"h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500",children:Object(C.jsxs)("div",{className:"bg-gray-50 p-5 rounded-lg shadow-2xl",children:[Object(C.jsx)("div",{className:"text-2xl text-center",children:"Login"}),Object(C.jsxs)("div",{className:"my-5",children:[Object(C.jsxs)("div",{className:"flex items-center border rounded mb-5",children:[Object(C.jsx)(Z,{value:c||"",onChange:function(e){return i(e.currentTarget.value)},id:"loginid",className:"w-full h-9 bg-transparent py-1 px-2 outline-none disabled:bg-gray-200",disabled:v}),Object(C.jsx)("label",{htmlFor:"loginid",className:"px-3 py-1.5 bg-gray-200 border-l",children:Object(C.jsx)(K.a,{icon:Q.b})})]}),Object(C.jsxs)("div",{className:"flex items-center border rounded mb-5",children:[Object(C.jsx)(ee,{value:a||"",onChange:function(e){return l(e.currentTarget.value)},id:"password",className:"w-full h-9 bg-transparent py-1 px-2 outline-none disabled:bg-gray-200",disabled:v}),Object(C.jsx)("label",{htmlFor:"password",className:"px-3 py-1.5 bg-gray-200 border-l",children:Object(C.jsx)(K.a,{icon:Q.a})})]})]}),Object(C.jsx)("button",{className:"bg-gradient-to-r from-blue-100 to-blue-200 w-full rounded-full p-2 hover:from-blue-300 hover:to-blue-400 hover:text-white",onClick:function(){return f()},disabled:v,children:"Login"})]})})},te=function(){var e=x({fetchPolicy:"network-only"}),n=e.loading,t=e.data,c=null===t||void 0===t?void 0:t.viewer;return n?Object(C.jsx)(C.Fragment,{children:"Loading ..."}):c?Object(C.jsx)(d.a,{to:"/"}):Object(C.jsx)(ne,{})},ce=function(){return Object(C.jsx)("div",{children:"Not Match"})},ie=t(71),oe=t(90),re=t(101),se=t(70),ae=Object(ie.a)({uri:"".concat("https://adachi-friend-ship-server.herokuapp.com","/graphql")}),le=Object(se.a)((function(e,n){var t=n.headers;return{headers:Object(b.a)(Object(b.a)({},t),{},{"X-Forwarded-User":localStorage.getItem("access_token")})}})),ue=new oe.a({link:le.concat(ae),cache:new re.a}),de=function(){return Object(C.jsx)(h.a,{client:ue,children:Object(C.jsx)(u.a,{basename:"friend-ship-client",children:Object(C.jsxs)(d.d,{children:[Object(C.jsx)(d.b,{path:"/",element:Object(C.jsx)(z,{})}),Object(C.jsx)(d.b,{path:"/login",element:Object(C.jsx)(te,{})}),Object(C.jsx)(d.b,{path:"/*",element:Object(C.jsx)(ce,{})})]})})})},he=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,103)).then((function(n){var t=n.getCLS,c=n.getFID,i=n.getFCP,o=n.getLCP,r=n.getTTFB;t(e),c(e),i(e),o(e),r(e)}))};t(86),t(87);l.a.render(Object(C.jsxs)(s.a.StrictMode,{children:[Object(C.jsx)(de,{}),Object(C.jsx)(Y.a,{})]}),document.getElementById("root")),he()}},[[88,1,2]]]);
//# sourceMappingURL=main.bfb63145.chunk.js.map