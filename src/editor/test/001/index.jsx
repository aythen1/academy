import React from 'react';
import { Page, Toolbar, Card, Button, Icon, List, ListHeader, ListItem } from 'react-onsenui';

import { fn1 } from './index.js'

const CardExample = () => {
  return (
    <Page>
      <Toolbar>
        <div className="center">Card</div>
      </Toolbar>


      <Card>
        <img src="https://monaca.io/img/logos/download_image_onsenui_01.png" alt="Onsen UI" style={{ width: '100%' }} />
        <div className="title">
          Awesome framework
        </div>
        <div className="content">
          <div>
            <Button
              onClick={() => fn1()}
            ><Icon icon="ion-ios-thumbs-up"></Icon></Button>
            <Button><Icon icon="ion-ios-share"></Icon></Button>
          </div>
          <List>
            <ListHeader>Bindings</ListHeader>
            <ListItem>Vue</ListItem>
            <ListItem>Angular</ListItem>
            <ListItem>React</ListItem>
          </List>
        </div>
      </Card>
    </Page>
  );
};


export default CardExample;
