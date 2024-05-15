import { Descriptions, Card, Button } from 'antd'
import styles from './index.module.less'
import * as echarts from 'echarts'
import { useEffect } from 'react'
import { text } from 'stream/consumers'

const DashBoard = () => {
  useEffect(() => {
    const lineChartDom = document.getElementById('lineChart')
    const chartInstance = echarts.init(lineChartDom as HTMLElement)
    chartInstance.setOption({
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['订单', '流水']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        data: [
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月'
        ]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
        },
        {
          name: '流水',
          type: 'line',
          data: [1000, 2000, 3000, 5000, 600, 800, 2000, 3200, 1100, 1200, 6000]
        }
      ]
    })

    const pieChartCityDom = document.getElementById('pieChartCity')
    const pieChartCityInstance = echarts.init(pieChartCityDom as HTMLElement)
    pieChartCityInstance.setOption({
      title: {
        text: '司机城市分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '北京' },
            { value: 735, name: '上海' },
            { value: 580, name: '广州' },
            { value: 484, name: '杭州' },
            { value: 300, name: '武汉' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })

    const pieChartAgeDom = document.getElementById('pieChartAge')
    const pieChartAgeInstance = echarts.init(pieChartAgeDom as HTMLElement)
    pieChartAgeInstance.setOption({
      title: {
        text: '司机年龄分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          radius: [50, 180],
          roseType: 'area',
          data: [
            { value: 30, name: '北京' },
            { value: 40, name: '上海' },
            { value: 60, name: '广州' },
            { value: 20, name: '杭州' },
            { value: 35, name: '武汉' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })

    const radarChartDom = document.getElementById('radarChart')
    const radarChartInstance = echarts.init(radarChartDom as HTMLElement)
    radarChartInstance.setOption({
      legend: {
        data: ['司机模型诊断']
      },
      radar: {
        indicator: [
          { name: '服务态度', max: 10 },
          { name: '在线时长', max: 600 },
          { name: '接单率', max: 100 },
          { name: '评分', max: 5 },
          { name: '关注度', max: 10000 }
        ]
      },
      series: [
        {
          name: '模型诊断',
          type: 'radar',
          data: [
            {
              value: [8, 300, 80, 4, 9000],
              name: '司机模型诊断'
            }
          ]
        }
      ]
    })
  }, [])

  return (
    <div className={styles.dashboard}>
      <div className={styles['user-info']}>
        <img
          className={styles.userImg}
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        />
        <Descriptions title='欢迎新同学，每天都要开心！'>
          <Descriptions.Item label='用户ID'>10001</Descriptions.Item>
          <Descriptions.Item label='邮箱'>yinwt1018@mail.com</Descriptions.Item>
          <Descriptions.Item label='状态'>在职</Descriptions.Item>
          <Descriptions.Item label='手机号'>13720226276</Descriptions.Item>
          <Descriptions.Item label='岗位'>前端工程师</Descriptions.Item>
          <Descriptions.Item label='部门'>大前端</Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>100个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>10000元</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总订单</div>
          <div className={styles.data}>2000单</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>50座</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card title='订单和流水走势图' extra={<Button type='primary'>刷新</Button>}>
          <div id='lineChart' className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='司机分布' extra={<Button type='primary'>刷新</Button>}>
          <div className={styles.pieChart}>
            <div id='pieChartCity' className={styles.itemPie}></div>
            <div id='pieChartAge' className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='模型诊断' extra={<Button type='primary'>刷新</Button>}>
          <div id='radarChart' className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}

export default DashBoard
