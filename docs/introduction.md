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
            label:'个数',
            key:'count'
        },
        {
            type:'radio',
            label:'姓名',
            key:'age',
            valueEnum:[
                {
                    label:'是',
                    value:'1'
                },
                {
                    label:'否',
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
                    value:'1'
                },
                {
                    label:'篮球',
                    value:'0'
                },
            ]
        }
    ]

const formProps = {
    labelPlacement:'left'
}


</script>

# Docs

This is a .md using a custom component

<proForm :formItems="formItems" :formProps="formProps"/>

## More docs

...
