<script setup>
import proForm from '../lib/components/proForm/index.tsx'


const formItems = [
        {
            type:'input',
            label:'姓名',
            key:'name'
        },
         {
            type:'inputNumber',
            label:'年龄',
            key:'age'
        },
        {
            type:'radio',
            label:'婚姻情况',
            key:'maritalStatus',
            valueEnum:[
                {
                    label:'已婚',
                    value:'1'
                },
                {
                    label:'未婚',
                    value:'0'
                },
            ]
        },
        {
            type:'select',
            label:'爱好',
            key:'like',
            valueEnum:[
                {
                    label:'足球',
                    value:'0'
                },
                {
                    label:'篮球',
                    value:'1'
                },
                {
                    label:'乒乓球',
                    value:'2'
                },
            ]
        },
        {
            type:'rate',
            label:'朋友打分',
            key:'rate'
        }
    ]

const formProps = {
    labelPlacement:'left',
    rules: {
        name: {
          required: true,
          message: '请输入电话号码',
          trigger: ['input']
        }
      }
}


</script>

# Docs

This is a .md using a custom component

<proForm :formItems="formItems" :formProps="formProps" title="个人信息录入" resetButton/>

## More docs

...
