/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import ReadDetail from './ReadDetail';

const AUTHCENTER = window.authcenter || null;

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }

  componentWillMount() {
    // AUTHCENTER.ready(() => { });
  }



  getToTalData = data => {
    const { counted, noCounted, countRate } = data;
    console.log('counted', counted)
    console.log('noCounted', noCounted)
    console.log('countRate', countRate)
  }

  closeFun = () => {
    this.setState({
      show: false,
    })
  }

  personListItemStyleFun = remark => {
    console.log('personListItemStyleFun remark', remark)
    const config = {
      "0": { color: '#f00', text: '有变化' },
      "1": { color: '#949494', text: '同昨日' },
    };
    const select = config[remark] || {};
    return <div style={{ color: select.color }}>{select.text || ''}</div>
  };

  render() {
    const { show } = this.state;

    return (
      <div>
        <div onClick={() => this.setState({ show: true })}>点击</div>
        {
          show && (
            <ReadDetail
              title='亟待解决的激动激亟待解决的激动激动的记得记得动的记得记得'
              show={show}
              className='nbugs-component-read'
              msgId={967389}
              closeFun={this.closeFun}
              getToTalData={this.getToTalData}
              emptyImg='https://s.xiaoyuanhao.com/file/bb5a7271-5fdb-4a67-9bca-bede42542a5e.svg'
              // initializingImg='https://s.xiaoyuanhao.com/file/bb5a7271-5fdb-4a67-9bca-bede42542a5e.svg'
              // type={0}
              // userId="CE3E2175946B4AC69FAC3B14ACA5F0FF"
              // orgId="330108-S000027"
              // parentId={'10870bd017db43778caaa5055b57121f'}
              // topBarTitle='回执情况'
              // bottomButtonText='提醒查看'
              // themeColor="red"
              personListItemStyleFun={this.personListItemStyleFun}
              // devAPI={'//devAPI111111'}
              // testAPI={'//testAPI11111111'}
              // productionAPI={'//productionAPI111111'}
              corpid={'wx981d0202130ed8e7'}
            />
          )
        }
      </div>

    );
  }
}

ReactDOM.render(<Test />, document.getElementById('root'));
