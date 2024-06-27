/**
* This is a basic example of use of monday.com SDK and Vibe UI components.
 * 
 * Based on https://github.com/mondaycom/welcome-apps/blob/master/apps/quickstart-react/src/App.js
 */

import { useState, useEffect } from "react";

import mondaySdk from "monday-sdk-js";
import { BaseContext } from "monday-sdk-js/types/client-context.type";

import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import { AttentionBox } from "monday-ui-react-core";

import "./App.css";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState<BaseContext>();

  useEffect(() => {
    // Notice this method notifies the monday platform that user gains a first value in an app.
    // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#valuecreatedforuser
    monday.execute("valueCreatedForUser");

    // TODO: set up event listeners, Here`s an example, read more here: https://developer.monday.com/apps/docs/mondaylisten/
    monday.listen("context", (res) => {
      setContext(res.data);
    });
  }, []);

  //Some example what you can do with context, read more here: https://developer.monday.com/apps/docs/mondayget#requesting-context-and-settings-data
  const attentionBoxText = `Hello, your user_id is: ${
    context ? context.user.id : "still loading"
  }.
  Let's start building your amazing app, which will change the world!`;

  return (
    <div className="App">
      <AttentionBox
        title="Hello Monday Apps!"
        text={attentionBoxText}
        type={AttentionBox.types.SUCCESS}
      />
    </div>
  );
};

export default App;
