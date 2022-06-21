import NotFound from "../components/items/NotFound";

import { searchRepo, searchRepoFile } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useHistory, useLocation } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { useEffect} from "react";

import TableReact from "../components/items/TableReact";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";

const Home = () => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchUrl = queryParams.get("url");
  const searchType = queryParams.get("type");

  const decodeBase64 = (str) => {
    const utf8Bytes = decodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      function (match, p1) {
        return String.fromCharCode("0x" + p1);
      }
    );
    return atob(utf8Bytes);
  };

  let dataFile = null;
  let typeApi = null;

  if (!searchUrl) {
    history.push("?url=https://api.github.com/repositories&type=null");
  }

  if (searchType === "file") {
    typeApi = searchRepoFile;
  } else {
    typeApi = searchRepo;
  }

  const {
    sendRequest,
    status,
    data: loadedItems,
    error,
  } = useHttp(typeApi, true);

  useEffect(() => {
    sendRequest(searchUrl);
  }, [sendRequest, searchUrl]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (error) {
    return <h2 className="centered">{error}</h2>;
  }

  if (status === "completed" && (!loadedItems || loadedItems.length === 0)) {
    return <NotFound></NotFound>;
  }
  

  if (searchType === "file") {
    const contentFile = loadedItems[0].content;

    try {
      dataFile = decodeBase64(contentFile);
    } catch (e) {}

    return (
      <SyntaxHighlighter languaje="javascript" showLineNumbers={true}>
        {dataFile}
      </SyntaxHighlighter>
    );
  } else {
    return <TableReact items={loadedItems}></TableReact>;
  }

  /*
  //Test FILE
  const content = "JDoudW5zaGlmdCBGaWxlLmRpcm5hbWUoX19GSUxFX18pICMgRm9yIHVzZS90\nZXN0aW5nIHdoZW4gbm8gZ2VtIGlzIGluc3RhbGxlZAoKIyBjb3JlCnJlcXVp\ncmUgJ2ZpbGV1dGlscycKcmVxdWlyZSAndGltZScKCiMgc3RkbGliCnJlcXVp\ncmUgJ3RpbWVvdXQnCnJlcXVpcmUgJ2xvZ2dlcicKcmVxdWlyZSAnZGlnZXN0\nL3NoYTEnCgojIHRoaXJkIHBhcnR5CgpiZWdpbgogIHJlcXVpcmUgJ21pbWUv\ndHlwZXMnCiAgcmVxdWlyZSAncnVieWdlbXMnCnJlc2N1ZSBMb2FkRXJyb3IK\nICByZXF1aXJlICdydWJ5Z2VtcycKICBiZWdpbgogICAgZ2VtICJtaW1lLXR5\ncGVzIiwgIj49MCIKICAgIHJlcXVpcmUgJ21pbWUvdHlwZXMnCiAgcmVzY3Vl\nIEdlbTo6TG9hZEVycm9yID0+IGUKICAgIHB1dHMgIldBUk5JTkc6IEdlbSBM\nb2FkRXJyb3I6ICN7ZS5tZXNzYWdlfSIKICBlbmQKZW5kCgojIHJ1YnkgMS45\nIGNvbXBhdGliaWxpdHkKcmVxdWlyZSAnZ3JpdC9ydWJ5MS45JwoKIyBpbnRl\ncm5hbCByZXF1aXJlcwpyZXF1aXJlICdncml0L2xhenknCnJlcXVpcmUgJ2dy\naXQvZXJyb3JzJwpyZXF1aXJlICdncml0L2dpdC1ydWJ5JwpyZXF1aXJlICdn\ncml0L2dpdCcgdW5sZXNzIGRlZmluZWQ/IEdyaXQ6OkdpdApyZXF1aXJlICdn\ncml0L3JlZicKcmVxdWlyZSAnZ3JpdC90YWcnCnJlcXVpcmUgJ2dyaXQvY29t\nbWl0JwpyZXF1aXJlICdncml0L2NvbW1pdF9zdGF0cycKcmVxdWlyZSAnZ3Jp\ndC90cmVlJwpyZXF1aXJlICdncml0L2Jsb2InCnJlcXVpcmUgJ2dyaXQvYWN0\nb3InCnJlcXVpcmUgJ2dyaXQvZGlmZicKcmVxdWlyZSAnZ3JpdC9jb25maWcn\nCnJlcXVpcmUgJ2dyaXQvcmVwbycKcmVxdWlyZSAnZ3JpdC9pbmRleCcKcmVx\ndWlyZSAnZ3JpdC9zdGF0dXMnCnJlcXVpcmUgJ2dyaXQvc3VibW9kdWxlJwpy\nZXF1aXJlICdncml0L2JsYW1lJwpyZXF1aXJlICdncml0L21lcmdlJwoKbW9k\ndWxlIEdyaXQKICBWRVJTSU9OID0gJzIuNS4wJwoKICBjbGFzcyA8PCBzZWxm\nCiAgICAjIFNldCArZGVidWcrIHRvIHRydWUgdG8gbG9nIGFsbCBnaXQgY2Fs\nbHMgYW5kIHJlc3BvbnNlcwogICAgYXR0cl9hY2Nlc3NvciA6ZGVidWcKICAg\nIGF0dHJfYWNjZXNzb3IgOnVzZV9naXRfcnVieQogICAgYXR0cl9hY2Nlc3Nv\nciA6bm9fcXVvdGUKCiAgICAjIFRoZSBzdGFuZGFyZCArbG9nZ2VyKyBmb3Ig\nZGVidWdnaW5nIGdpdCBjYWxscyAtIHRoaXMgZGVmYXVsdHMgdG8gYSBwbGFp\nbiBTVERPVVQgbG9nZ2VyCiAgICBhdHRyX2FjY2Vzc29yIDpsb2dnZXIKICAg\nIGRlZiBsb2coc3RyKQogICAgICBsb2dnZXIuZGVidWcgeyBzdHIgfQogICAg\nZW5kCiAgZW5kCiAgc2VsZi5kZWJ1ZyA9IGZhbHNlCiAgc2VsZi51c2VfZ2l0\nX3J1YnkgPSB0cnVlCiAgc2VsZi5ub19xdW90ZSA9IGZhbHNlCgogIEBsb2dn\nZXIgfHw9IDo6TG9nZ2VyLm5ldyhTVERPVVQpCgogIGRlZiBzZWxmLnZlcnNp\nb24KICAgIFZFUlNJT04KICBlbmQKZW5kCg==\n";
  
    try {
      data = decodeBase64(content);
    } catch (e) {}

  return (<SyntaxHighlighter languaje="javascript" showLineNumbers={true}>{data}</SyntaxHighlighter>);
  TEST FOLDER
  return (<TableReact items={loadedItems}></TableReact>);
  */
};

export default Home;
