# @author github.com/wulove
import time
from datetime import datetime, timedelta, timezone
import logging
import sys
import math

if (len(sys.argv) < 2):
	exit()
now = datetime.now()
zone_cn = timezone(timedelta(hours=8))
now_cn = now.astimezone(zone_cn)
logging.warning(f'服务器时间：{now}, 北京时间：{now_cn}')
logging.warning(now_cn.hour)
argv = []
if (len(sys.argv) == 2 and "-" in sys.argv[1]):
	hs = sys.argv[1].split("-")
	argv = list(range(int(hs[0]), int(hs[1])))
else :
	for i in range(1, len(sys.argv)):
		argv.append(int(sys.argv[i]))
if 0 in argv:
	argv[argv.index(0)] = 24
	argv.sort()
target_hour = -1
hour = now_cn.hour
for e in argv:
	if (hour < e):
		target_hour = e
		break
logging.error(f'格式化后的参数: {argv}')
logging.warning(f'匹配到的参数为: {target_hour}')
exit()

if target_hour == -1:
	logging.error(f'木有匹配到对应的参数: {sys.argv[1:]}')
	exit()
logging.warning(f'匹配到的参数为: {target_hour}')

if target_hour == 24:
	target_hour = 0
target_time = now_cn.replace(hour=target_hour,minute=0, second=0, microsecond=0)
if target_hour == 0:
	target_time = target_time + timedelta(days=1)
logging.warning(f'当前时间: {now_cn}, 目标时间: {target_time}')

td = target_time - now_cn
if td.seconds > 3600:
	logging.error('时间差大于1小时，退出')
	exit()
logging.warning(f'需要沉睡：{td.seconds}秒')
wait = td.seconds+math.floor(td.microseconds/1000)/1000
time.sleep(wait)
logging.warning(f'当前北京时间：{datetime.now().astimezone(zone_cn)}')
