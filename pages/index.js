import React, {
  useCallback,
  useState,
} from 'react';
import Head from 'next/head';
import { Layout, Menu, Avatar, Dropdown, Button } from 'antd';
import {
  QrcodeOutlined,
  FileImageOutlined,
  FileOutlined,
  VideoCameraOutlined,
  ContainerOutlined,
  LinkOutlined,
} from '@ant-design/icons';

import Uploader from '../components/Uploader';
import QRCode from '../components/QRCode';
import ShortUrl from '../components/ShortUrl';
import Placeholder from '../components/Placeholder';

import auth0 from '../utils/auth0';

import 'antd/dist/antd.css';
import './index.css';

const { Header, Content } = Layout;

const App = ({ user }) => {
  const [type, setType] = useState('image');

  const handleTypeChange = useCallback((e) => {
    setType(e.key);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Get Link!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <Header
        style={{
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
          selectedKeys={[type]}
          onClick={handleTypeChange}
        >
          <Menu.Item key="image">
            <FileImageOutlined />IMAGE
          </Menu.Item>
          <Menu.Item key="video">
            <VideoCameraOutlined />VIDEO
          </Menu.Item>
          <Menu.Item key="file">
            <FileOutlined />FILE
          </Menu.Item>
          <Menu.Item key="placeholder">
            <ContainerOutlined />Placeholder
          </Menu.Item>
          <Menu.Item key="qrcode">
            <QrcodeOutlined />QR Code
          </Menu.Item>
          <Menu.Item key="urlshorten">
            <LinkOutlined />URL Shortener
          </Menu.Item>
        </Menu>
        {user ? (
          <Dropdown overlay={(
            <Menu>
              <Menu.Item>
                <a href="/api/logout">Logout</a>
              </Menu.Item>
            </Menu>
          )}>
            <Avatar src={user.picture} />
          </Dropdown>
        ) : (
          <Button type="link" href="/api/login">Login</Button>
        )}
      </Header>
      <Content
        style={{
          padding: 24,
          background: '#fff',
        }}
      >
        {type === 'image' && <Uploader user={user} type="image" />}
        {type === 'video' && <Uploader user={user} type="video" />}
        {type === 'file' && <Uploader user={user} type="file" />}
        {type === 'qrcode' && <QRCode />}
        {type === 'urlshorten' && <ShortUrl />}
        {type === 'placeholder' && <Placeholder />}
      </Content>
    </Layout>
  );
};

App.getInitialProps = async ({ req, res }) => {
  if (typeof window === 'undefined') {
    const { user } = await auth0.getSession(req) || {};

    return { user };
  }
};

export default App;