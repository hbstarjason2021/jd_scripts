import React, { Fragment, useEffect, useState } from 'react';
import {
  Button,
  Row,
  Input,
  Form,
  message,
  notification,
  Statistic,
} from 'antd';
import config from '@/utils/config';
import { history, Link } from 'umi';
import styles from './index.less';
import { request } from '@/utils/http';
import { useTheme } from '@/utils/hooks';
import { MobileOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const { Countdown } = Statistic;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [waitTime, setWaitTime] = useState<any>();
  const { theme } = useTheme();
  const [twoFactor, setTwoFactor] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [loginInfo, setLoginInfo] = useState<any>();

  const handleOk = (values: any) => {
    setLoading(true);
    setTwoFactor(false);
    setWaitTime(null);
    request
      .post(`${config.apiPrefix}login`, {
        data: {
          username: values.username,
          password: values.password,
        },
      })
      .then((data) => {
        if (data.code === 420) {
          setLoginInfo({
            username: values.username,
            password: values.password,
          });
          setTwoFactor(true);
        } else {
          checkResponse(data);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  const completeTowFactor = (values: any) => {
    setVerifying(true);
    request
      .put(`${config.apiPrefix}user/two-factor/login`, {
        data: { ...loginInfo, code: values.code },
      })
      .then((data: any) => {
        if (data.code === 430) {
          message.error(data.message);
        } else {
          checkResponse(data);
        }
        setVerifying(false);
      })
      .catch((error: any) => {
        console.log(error);
        setVerifying(false);
      });
  };

  const checkResponse = (data: any) => {
    if (data.code === 200) {
      const {
        token,
        lastip,
        lastaddr,
        lastlogon,
        retries = 0,
        platform,
      } = data.data;
      localStorage.setItem(config.authKey, token);
      notification.success({
        message: '登录成功！',
        description: (
          <>
            <div>
              上次登录时间：
              {lastlogon ? new Date(lastlogon).toLocaleString() : '-'}
            </div>
            <div>上次登录地点：{lastaddr || '-'}</div>
            <div>上次登录IP：{lastip || '-'}</div>
            <div>上次登录设备：{platform || '-'}</div>
            <div>上次登录状态：{retries > 0 ? `失败${retries}次` : '成功'}</div>
          </>
        ),
        duration: 5,
      });
      history.push('/crontab');
    } else if (data.code === 100) {
      message.warn(data.message);
    } else if (data.code === 410) {
      message.error(data.message);
      setWaitTime(data.data);
    } else {
      message.error(data.message);
    }
  };

  useEffect(() => {
    const isAuth = localStorage.getItem(config.authKey);
    if (isAuth) {
      history.push('/crontab');
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <img
            alt="logo"
            className={styles.logo}
            src="https://z3.ax1x.com/2021/11/18/I7MpAe.png"
          />
          <span className={styles.title}>
            {twoFactor ? '两步验证' : config.siteName}
          </span>
        </div>
      </div>
      <div className={styles.main}>
        {twoFactor ? (
          <Form layout="vertical" onFinish={completeTowFactor}>
            <FormItem
              name="code"
              label="验证码"
              rules={[
                {
                  pattern: /^[0-9]{6}$/,
                  message: '验证码为6位数字',
                  validateTrigger: 'onBlur',
                },
              ]}
              hasFeedback
            >
              <Input placeholder="6位数字" autoFocus autoComplete="off" />
            </FormItem>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              loading={verifying}
            >
              验证
            </Button>
          </Form>
        ) : (
          <Form layout="vertical" onFinish={handleOk}>
            <FormItem name="username" label="用户名" hasFeedback>
              <Input placeholder="用户名" autoFocus />
            </FormItem>
            <FormItem name="password" label="密码" hasFeedback>
              <Input type="password" placeholder="密码" />
            </FormItem>
            <Row>
              {waitTime ? (
                <Button type="primary" style={{ width: '100%' }} disabled>
                  请
                  <Countdown
                    valueStyle={{
                      color:
                        theme === 'vs'
                          ? 'rgba(0,0,0,.25)'
                          : 'rgba(232, 230, 227, 0.25)',
                    }}
                    className="inline-countdown"
                    onFinish={() => setWaitTime(null)}
                    format="ss"
                    value={Date.now() + 1000 * waitTime}
                  />
                  秒后重试
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                  loading={loading}
                >
                  登录
                </Button>
              )}
            </Row>
          </Form>
        )}
      </div>
      <div className={styles.extra}>
        {twoFactor ? (
          <div style={{ paddingLeft: 20, position: 'relative' }}>
            <MobileOutlined style={{ position: 'absolute', left: 0, top: 4 }} />
            在您的设备上打开两步验证应用程序以查看您的身份验证代码并验证您的身份。
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Login;