<template>
    <div class="container">
        <div style="max-width:59rem !important; margin-left:auto !important; margin-right:auto !important;">
            <div class="title">
                <h1>医 疗 保 障 基 金 结 算 清 单</h1>
            </div>
            <el-form ref="formRef" :model="form" :rules="formRules" :inline="true">
                <el-row>
                    <el-form-item label="清单流水号" class="w-17 mr-5">
                        <el-input v-model="form.list_sn"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="定点医疗机构名称" class="w-17 mr-4">
                        <el-input v-model="form.org_name"></el-input>
                    </el-form-item>
                    <el-form-item label="定点医疗机构代码" class="w-17 mr-4">
                        <el-input v-model="form.org_code"></el-input>
                    </el-form-item>
                    <el-form-item label="医保结算等级" class="w-17">
                        <el-input v-model="form.settlement_lvl"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="医保编号" class="w-17 mr-4">
                        <el-input v-model="form.settlement_num"></el-input>
                    </el-form-item>
                    <el-form-item label="病案号" class="w-17 mr-4">
                        <el-input v-model="form.case_num"></el-input>
                    </el-form-item>
                    <el-form-item label="申报时间" class="w-17">
                        <el-date-picker 
                            v-model="form.report_time" 
                            type="date" 
                            format="YYYY/MM/DD"
                            value-format="YYYY-MM-DD"
                            placeholder="选择">
                        </el-date-picker>
                    </el-form-item>
                </el-row>
                <el-row class="subtitle">
                    <p class="subtitle-line">一、基本信息</p>
                </el-row>
                <el-row>
                    <el-form-item label="姓名" class="w-12 mr-2">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" class="label-emphasize w-13 mr-2">
                        <el-select v-model="form.gender" placeholder="请选择">
                            <el-option
                                v-for="gender in genders"
                                :key="gender.value"
                                :label="gender.label"
                                :value="gender.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出生日期" class="label-emphasize w-13 mr-2">
                        <el-date-picker 
                        v-model="form.birthday" 
                        type="date" 
                        format="YYYY/MM/DD"
                        value-format="YYYY-MM-DD"
                        :disabledDate="disabledDate0"
                        @change="birthOrAdmitdayOnChange"
                        placeholder="选择">
                        </el-date-picker>
                    </el-form-item>
                    <!-- 待修改 -->
                    <el-form-item label="年龄:" class="label-emphasize w-3">
                    </el-form-item>
                    <span class="el-form-item__label w-8" style="padding-right:0px !important">{{this.form.age}}</span>
                </el-row>
                <el-row class="label-emphasize">
                    <el-form-item label="国籍" class="w-12 mr-2">
                        <el-select placeholder="请选择国籍" @change="nationalityOnChange" v-model="form.nationality" filterable>
                            <el-option-group v-for="group in countries" :key="group.label" :label="group.label">
                                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.label">
                                    <span style="float: left">{{ item.label }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                                </el-option>
                            </el-option-group>
                            <!-- 版权声明：本文为CSDN博主「ryaaaaaaaa」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
                            原文链接：https://blog.csdn.net/weixin_42345894/article/details/85158130 -->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="民族" class="w-13 mr-2">
                        <el-select v-model="form.ethnicity" placeholder="民族" filterable style="width:100%">
                            <el-option
                                v-for="eth in ethnicities"
                                :key="eth.id"
                                :label="eth.info"
                                :value="eth.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="患者证件类型" class="w-13 mr-2">
                        <el-select v-model="form.id_type" placeholder="请选择" style="width:100%">
                            <el-option
                                v-for="type in id_types"
                                :key="type.value"
                                :label="type.label"
                                :value="type.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="患者证件号" class="w-15">
                        <el-input 
                        v-model="idNumVal"
                        :disabled="this.form.id_type===''"
                        ></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="职业" class="w-12 mr-2">
                        <el-select v-model="form.profession" placeholder="请选择" style="width:100%">
                            <el-option
                                v-for="job in professions"
                                :key="job.value"
                                :label="job.label"
                                :value="job.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="现住址" class="w-13">
                        <!-- <elui-china-area-dht :leave="3" @change="presentAddrOnChange" style="width:100%"></elui-china-area-dht> -->
                        <el-cascader
                            size="large"
                            :options="locations"
                            v-model="form.present_addr1"
                            style="width:100%"
                            @change="presentAddrOnChange"
                            >
                        </el-cascader>
                    </el-form-item>
                    <el-form-item class="w-21">
                        <el-input v-model="form.present_addr2"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="工作单位及地址" class="w-15">
                        <!-- <elui-china-area-dht :leave="3" @change="workAddrOnChange" style="width:100%"></elui-china-area-dht> -->
                        <el-cascader
                            size="large"
                            :options="locations"
                            v-model="form.work_addr1"
                            style="width:100%"
                            >
                        </el-cascader>
                    </el-form-item>
                    <el-form-item class="w-17 mr-2">
                        <el-input v-model="form.work_addr2"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" class="w-14 mr-2">
                        <el-input v-model="form.work_phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮编" class="w-9">
                        <el-input v-model="form.work_zip"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="联系人姓名" class="label-emphasize w-12 mr-2">
                        <el-input v-model="form.contact_name"></el-input>
                    </el-form-item>
                    <el-form-item label="关系" class="w-10 mr-2">
                        <el-select v-model="form.contact_relation" placeholder="请选择">
                            <el-option
                                v-for="rel in contact_relations"
                                :key="rel.value"
                                :label="rel.label"
                                :value="rel.value"
                                :disabled="rel.disabled"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地址" class="w-12">
                        <el-cascader
                        size="large"
                        :options="locations"
                        v-model="form.contact_addr1"
                        style="width:100%"
                        >
                        </el-cascader>
                    </el-form-item>
                    <el-form-item class="w-10 mr-2">
                        <el-input v-model="form.contact_addr2"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" class="w-9">
                        <el-input v-model="form.contact_phone"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="医保类型" class="w-12 mr-2">
                        <el-select v-model="form.settlement_type" placeholder="请选择" style="width:100%">
                            <el-option
                                v-for="type in settlement_types"
                                :key="type.value"
                                :label="type.label"
                                :value="type.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="特殊人员类型" class="w-13 mr-2">
                        <el-select v-model="form.special_person_type" placeholder="请选择" style="width:100%">
                            <el-option
                                v-for="type in special_person_types"
                                :key="type.value"
                                :label="type.label"
                                :value="type.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="参保地" class="w-13">
                        <el-input v-model="form.settlement_loc"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="新生儿入院类型" class="w-20 mr-3">
                        <el-select
                        v-model="form.newborn_admit_type"
                        multiple
                        collapse-tags
                        collapse-tags-tooltip
                        placeholder="请选择"
                        style="width: 100%"
                        >
                        <el-option
                            v-for="type in newborn_admit_types"
                            :key="type.value"
                            :label="type.label"
                            :value="type.value"
                        />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="新生儿出生体重（克）" :max="8000" class="w-16 mr-5">
                        <el-input-number v-model="form.newborn_birth_weight" controls-position="right"></el-input-number>
                    </el-form-item>
                    <el-form-item label="新生儿入院体重（克）" :max="8000" class="w-15">
                        <el-input-number v-model="form.newborn_admit_weight" controls-position="right"></el-input-number>
                    </el-form-item>
                </el-row>
                <el-row v-show="form.contact_relation==='8'">
                    <!-- 针对其他关系可进行说明 -->
                    <el-form-item label="其他关系说明" class="w-18">
                        <el-input v-model="form.contact_other_description"></el-input>
                    </el-form-item>
                </el-row>
                <el-row class="subtitle">
                    <p class="subtitle-line">二、门诊慢特病诊疗信息</p>
                </el-row>
                <el-row>
                    <el-form-item label="诊断科别" class="w-17 mr-2">
                        <el-cascader
                            v-model="form.diag_specialty"
                            :options="specialties"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="就诊日期" class="w-17">
                        <el-date-picker 
                        v-model="form.diag_date" 
                        type="date" 
                        format="YYYY/MM/DD"
                        value-format="YYYY-MM-DD"
                        placeholder="选择">
                        </el-date-picker>
                    </el-form-item>
                </el-row>
                
                <el-form
                :model="form.diag_info"
                ref="form.diag_info"
                label-with="100px"
                class="demo-dynamic label-emphasize-light"
                >
                    <el-row class="first-row">
                        <el-form-item label="病种名称" class="w-12 mr-1">
                        </el-form-item>
                        <el-form-item label="病种代码" class="w-12 mr-1">
                        </el-form-item>
                        <el-form-item label="手术及操作名称" class="w-12 mr-1">
                        </el-form-item>
                        <el-form-item label="手术及操作代码">
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem">
                        <el-form-item
                        v-for="info in form.diag_info"
                        :key="info.key"
                        style="height: auto !important;"
                        >
                            <el-row class="repeat-row">
                                <el-row>
                                    <el-form-item class="w-12 mr-2">
                                        <el-input v-model="info.disease_name"></el-input>
                                    </el-form-item>
                                    <el-form-item class="w-12 mr-2">
                                        <el-input v-model="info.disease_code"></el-input>
                                    </el-form-item>
                                    <el-form-item class="w-12 mr-2">
                                        <el-input v-model="info.op_name"></el-input>
                                    </el-form-item>
                                    <el-form-item class="w-12">
                                        <el-input v-model="info.op_code"></el-input>
                                    </el-form-item>
                                    <el-button class="remove-spdiag" @click.prevent="removeDiagInfo(info)">-</el-button>
                                </el-row>
                            </el-row>   
                        </el-form-item>
                        <el-row justify="end">
                            <el-button class="add-op" style="margin-top:1rem; margin-right:.9rem; line-height:20px !important" @click="addDiagInfo">+ 信息</el-button>
                        </el-row>  
                    </el-row>
                    
                </el-form>
                <el-row class="subtitle">
                    <p class="subtitle-line">三、住院诊疗信息</p>
                </el-row>
                <el-row>
                    <el-form-item label="住院医疗类型" class="w-17 mr-4">
                        <el-select v-model="form.hosp_reason" placeholder="请选择" style="width:100%">
                            <el-option
                                v-for="reason in hosp_reasons"
                                :key="reason.value"
                                :label="reason.label"
                                :value="reason.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="入院途径" class="w-17 mr-4">
                        <el-select v-model="form.admit_path" placeholder="请选择" style="width: 17rem;">
                            <el-option
                                v-for="path in admit_paths"
                                :key="path.value"
                                :label="path.label"
                                :value="path.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="治疗类别" class="w-17">
                        <el-cascader
                            v-model="form.heal_type"
                            :options="heal_types"
                            @change="test"
                        ></el-cascader>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="入院时间" class="w-17 mr-4">
                        <el-date-picker
                        popper-class="datehr"
                        v-model="form.admit_time" 
                        type="datetime" 
                        format="YYYY/MM/DD hh:mm"
                        value-format="YYYY-MM-DD hh:MM"
                        :disabledDate="disabledDate1"
                        @change="birthOrAdmitdayOnChange();admitOrReleasedayOnChange()"
                        placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="入院科别" class="w-17 mr-4">
                        <el-cascader
                            v-model="form.admit_specialty"
                            :options="specialties"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="科转科别" class="w-17">
                        <el-cascader
                            v-model="form.trans_specialty"
                            :options="specialties"
                        ></el-cascader>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="出院时间" class="w-17 mr-4">
                        <el-date-picker
                        popper-class="datehr"
                        v-model="form.release_time" 
                        type="datetime" 
                        format="YYYY/MM/DD hh:mm"
                        value-format="YYYY-MM-DD hh:MM"
                        :disabledDate="disabledDate2"
                        @change="admitOrReleasedayOnChange()"
                        placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="出院科别" class="w-17 mr-4">
                        <el-cascader
                            v-model="form.release_specialty"
                            :options="specialties"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="实际入院天数:" class="w-6"></el-form-item>
                    <span class="el-form-item__label w-11">{{getHospDuration()}}</span>
                    <el-row>
                        <el-form-item label="门（急）诊诊断（西医诊断）" style="width:38rem; margin-right:4rem !important; height: auto !important">
                            <el-input v-model="form.w_emergency_diag" :autosize="{ minRows: 1, maxRows: 6 }" type="textarea"></el-input>
                        </el-form-item>
                        <el-form-item label="疾病代码" class="w-17">
                            <el-input v-model="form.w_disease_code"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="门（急）诊诊断（中医诊断）" style="width:38rem; margin-right:4rem !important; height: auto !important">
                            <el-input v-model="form.t_emergency_diag" :autosize="{ minRows: 1, maxRows: 6 }" type="textarea"></el-input>
                        </el-form-item>
                        <el-form-item label="疾病代码" class="w-17">
                            <el-input v-model="form.t_disease_code"></el-input>
                        </el-form-item>
                    </el-row>
                </el-row>
                <el-row v-show="form.heal_type == 3">
                    <el-form-item label="出院诊断类别" class="w-10">
                        <el-select v-model="release_heal_type" placeholder="请选择" style="width:100%">
                            <el-option
                                v-for="type in release_heal_types"
                                :key="type.value"
                                :label="type.label"
                                :value="type.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>                    
                </el-row>
                <!-- 针对西医 -->
                <el-form
                v-show="form.heal_type[0] == 1||(form.heal_type[0]==3&&release_heal_type==1)"
                :model="form.western_release"
                ref="form.western_release"
                label-with="100px"
                class="demo-dynamic label-emphasize-light"
                style="height:auto"
                >
                    <el-row style="padding-left:1rem !important; margin:1rem 0rem 0rem 0rem;">
                        <el-form-item label="出院西医诊断" class="w-12 mr-1">
                        </el-form-item>
                        <el-form-item label="疾病代码" class="w-12 mr-1">
                        </el-form-item>
                        <el-form-item label="入院病情" class="w-12 mr-1">
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem;">
                        <el-row>
                            <el-form-item class="w-12 mr-1 diag">
                                <el-input v-model="form.western_release.main_diag.diag" :autosize="{ minRows: 1, maxRows: 6 }" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item class="w-12 mr-1">
                                <el-input v-model="form.western_release.main_diag.disease_code"></el-input>
                            </el-form-item>
                            <el-form-item class="w-12 mr-1">
                                <el-input v-model="form.western_release.main_diag.admit_condition"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-form-item
                        v-for="diag in form.western_release.other_diags"
                        :key="diag.key"
                        style="height: auto !important;"
                        >
                            <el-row style="width:100%; padding-left:0rem !important; margin:.2rem 0 .5rem 0;">
                                <el-col :span="23.8">
                                    <el-row>
                                        <el-form-item class="w-12 mr-1">
                                            <el-input v-model="diag.diag" :autosize="{ minRows: 1, maxRows: 6 }" type="textarea"></el-input>
                                        </el-form-item>
                                        <el-form-item class="w-12 mr-1">
                                            <el-input v-model="diag.disease_code"></el-input>
                                        </el-form-item>
                                        <el-form-item class="w-12 mr-1">
                                            <el-input v-model="diag.admit_condition"></el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-col>
                                <el-col :span="0.2">
                                    <el-button class="remove-op" @click.prevent="removeWRDiag(diag)">-</el-button>
                                </el-col>
                            </el-row>   
                        </el-form-item>
                        <el-row justify="end">
                            <el-button class="add-op" style="margin-right:.9rem" @click="addWRDiag">+ 信息</el-button>
                        </el-row>  
                    </el-row>
                </el-form>
                <el-form
                v-show="form.heal_type[0] == 2||(form.heal_type[0]==3&&release_heal_type==2)"
                :model="form.traditional_release"
                ref="form.traditional_release"
                label-with="100px"
                class="demo-dynamic label-emphasize-light"
                style="height:auto"
                >
                    <el-row style="padding-left:1rem !important; margin:1rem 0rem 0rem 0rem;">
                        <el-form-item label="出院中医诊断" class="w-12 mr-1">
                        </el-form-item>
                        <el-form-item label="疾病代码" class="w-12 mr-1">
                        </el-form-item>
                        <el-form-item label="入院病情" class="w-12 mr-1">
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem;">
                        <el-row>
                            <el-form-item class="w-12 mr-1 diag">
                                <el-input v-model="form.traditional_release.main_disease.diag" :autosize="{ minRows: 1, maxRows: 6 }" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item class="w-12 mr-1">
                                <el-input v-model="form.traditional_release.main_disease.disease_code"></el-input>
                            </el-form-item>
                            <el-form-item class="w-12 mr-1">
                                <el-input v-model="form.traditional_release.main_disease.admit_condition"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-form-item
                        v-for="symp in form.traditional_release.main_symps"
                        :key="symp.key"
                        style="height: auto !important;"
                        >
                            <el-row style="width:100%; padding-left:0rem !important; margin:.2rem 0 .5rem 0;">
                                <el-col :span="23.8">
                                    <el-row>
                                        <el-form-item class="w-12 mr-1">
                                            <el-input v-model="symp.diag" :autosize="{ minRows: 1, maxRows: 6 }" type="textarea"></el-input>
                                        </el-form-item>
                                        <el-form-item class="w-12 mr-1">
                                            <el-input v-model="symp.disease_code"></el-input>
                                        </el-form-item>
                                        <el-form-item class="w-12 mr-1">
                                            <el-input v-model="symp.admit_condition"></el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-col>
                                <el-col :span="0.2">
                                    <el-button class="remove-op" @click.prevent="removeTRDiag(symp)">-</el-button>
                                </el-col>
                            </el-row>   
                        </el-form-item>
                        <el-row justify="end">
                            <el-button class="add-op" style="margin-right:.9rem" @click="addTRDiag">+ 信息</el-button>
                        </el-row>  
                    </el-row>
                </el-form>
                <el-row v-show="form.heal_type[0]==1|form.heal_type[0]==2|form.heal_type[0]==3">
                    <el-form-item label="诊断代码计数" :max="8000" class="w-12">
                        <el-input-number v-model="form.diag_cnt" controls-position="right"></el-input-number>
                    </el-form-item>
                </el-row>
                <el-row>
                    <p class="sub-subtitle"
                    style="width: 100%; margin: 1.5rem 1rem 0 1rem; padding:0.2rem;">主要手术</p>
                </el-row>
                <el-form
                :model="form.other_ops"
                ref="form.other_ops"
                label-with="100px"
                class="demo-dynamic label-emphasize-black"
                >
                    <el-row style="margin:0rem 1rem 0rem 1rem;">
                        <el-form-item label="名称" class="w-8 mr-1">
                        </el-form-item>
                        <el-form-item label="代码" class="w-7 mr-1">
                        </el-form-item>
                        <el-form-item label="麻醉方式" class="w-8 mr-1"></el-form-item>
                        <el-form-item label="术者姓名" class="w-7 mr-1"></el-form-item>
                        <el-form-item label="术者代码" class="w-7 mr-1"></el-form-item>
                        <el-form-item label="麻醉姓名" class="w-7 mr-1"></el-form-item>
                        <el-form-item label="麻醉代码" class="w-7"></el-form-item>
                    </el-row>
                    <el-form-item
                    v-for="(op) in form.main_ops"
                    :key="op.key"
                    style="height: auto !important;"
                    >
                        <el-row class="operations" style="padding-left:1rem !important; margin:0rem 0 .5rem 0;">
                                <el-row>
                                    <el-form-item class="w-8 mr-1">
                                        <el-input v-model="op.name"></el-input>
                                    </el-form-item>
                                    <el-form-item class="w-7 mr-1">
                                        <el-input v-model="op.code"></el-input>
                                    </el-form-item>
                                    <el-form-item class="w-8 mr-1">
                                        <el-select v-model="op.anaesthesia_type" placeholder="请选择">
                                            <el-option
                                                v-for="type in anaesthesia_types"
                                                :key="type.value"
                                                :label="type.label"
                                                :value="type.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item class="w-7 mr-1">
                                        <el-input v-model="op.operator_name"></el-input>
                                    </el-form-item>
                                    <el-form-item class="w-7 mr-1">
                                        <el-input v-model="op.operator_code"></el-input>
                                    </el-form-item>
                                    <el-form-item class="w-7 mr-1">
                                        <el-input v-model="op.anaesthetist_name"></el-input>
                                    </el-form-item>
                                    <el-form-item class="w-7">
                                        <el-input v-model="op.anaesthetist_code"></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="手术起止时间" class="w-25 mr-1">
                                        <el-date-picker
                                        popper-class="datehr"
                                        v-model="op.op_time"
                                        type="datetimerange"
                                        start-placeholder="Start Date"
                                        end-placeholder="End Date"
                                        :default-time="defaultTime1"
                                        value-format="YYYY-MM-DD hh:MM"

                                        @change="opTimeOnChange"
                                        />
                                    </el-form-item>
                                    <el-form-item label="麻醉起止时间" class="w-25">
                                        <el-date-picker
                                        popper-class="datehr"
                                        v-model="op.anaesthesia_time"
                                        type="datetimerange"
                                        start-placeholder="Start Date"
                                        end-placeholder="End Date"
                                        :default-time="defaultTime1"
                                        value-format="YYYY-MM-DD hh:MM"
                                        />
                                    </el-form-item>
                                    <el-button class="starBtn" @click.prevent="moveToOtherOp(op)">
                                        <el-icon><StarFilled/></el-icon>
                                    </el-button>
                                    <el-button class="delOpBtn" @click.prevent="removeMainOp(op)">
                                        <el-icon><Close/></el-icon>
                                    </el-button>
                                </el-row>
                        </el-row>                            
                    </el-form-item>
                    <el-row>
                        <p class="sub-subtitle"
                        style="width: 100%; margin: .5rem 1rem 0 1rem; padding:0.2rem;">其他手术</p>
                    </el-row>
                </el-form>
                <el-form
                :model="form.other_ops"
                ref="form.other_ops"
                label-with="100px"
                class="demo-dynamic label-emphasize-black"
                >
                    <el-row style="margin:0rem 1rem 0rem 1rem;">
                        <el-form-item label="名称" class="w-8 mr-1">
                        </el-form-item>
                        <el-form-item label="代码" class="w-7 mr-1">
                        </el-form-item>
                        <el-form-item label="麻醉方式" class="w-8 mr-1"></el-form-item>
                        <el-form-item label="术者姓名" class="w-7 mr-1"></el-form-item>
                        <el-form-item label="术者代码" class="w-7 mr-1"></el-form-item>
                        <el-form-item label="麻醉姓名" class="w-7 mr-1"></el-form-item>
                        <el-form-item label="麻醉代码" class="w-7"></el-form-item>
                    </el-row>
                    <el-form-item
                    v-for="(op) in form.other_ops"
                    :key="op.key"
                    style="height: auto !important;"
                    >
                        <el-row class="operations" style="padding-left:1rem !important; margin:0rem 0 .5rem 0;">
                                <el-row>
                                    <el-form-item class="w-8 mr-1">
                                        <el-input v-model="op.name"></el-input>
                                    </el-form-item>
                                    <el-form-item class="w-7 mr-1">
                                        <el-input v-model="op.code"></el-input>
                                    </el-form-item>
                                    <el-form-item class="w-8 mr-1">
                                        <el-select v-model="op.anaesthesia_type" placeholder="请选择">
                                            <el-option
                                                v-for="type in anaesthesia_types"
                                                :key="type.value"
                                                :label="type.label"
                                                :value="type.value"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item class="w-7 mr-1">
                                        <el-input v-model="op.operator_name"></el-input>
                                    </el-form-item>
                                    <el-form-item class="w-7 mr-1">
                                        <el-input v-model="op.operator_code"></el-input>
                                    </el-form-item>
                                    <el-form-item class="w-7 mr-1">
                                        <el-input v-model="op.anaesthetist_name"></el-input>
                                    </el-form-item>
                                    <el-form-item class="w-7">
                                        <el-input v-model="op.anaesthetist_code"></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="手术起止时间" class="w-25 mr-1">
                                        <el-date-picker
                                        popper-class="datehr"
                                        v-model="op.op_time"
                                        type="datetimerange"
                                        start-placeholder="Start Date"
                                        end-placeholder="End Date"
                                        :default-time="defaultTime1"
                                        value-format="YYYY-MM-DD hh:MM"
                                        />
                                    </el-form-item>
                                    <el-form-item label="麻醉起止时间" class="w-25">
                                        <el-date-picker
                                        popper-class="datehr"
                                        v-model="op.anaesthesia_time"
                                        type="datetimerange"
                                        start-placeholder="Start Date"
                                        end-placeholder="End Date"
                                        :default-time="defaultTime1"
                                        value-format="YYYY-MM-DD hh:MM"
                                        />
                                    </el-form-item>
                                    
                                    <el-button class="starBtn" @click.prevent="moveToMainOp(op)">
                                        <el-icon><Star/></el-icon>
                                    </el-button>
                                    <el-button class="delOpBtn" @click.prevent="removeOtherOp(op)">
                                        <el-icon><Close/></el-icon>
                                    </el-button>
                                </el-row>
                        </el-row>                            
                    </el-form-item>
                    <el-row justify="space-between" style="margin-top:.2rem;margin-bottom:.5rem;padding-left:1rem;">
                        <el-form-item label="手术及操作代码计数" :max="8000" class="w-12">
                            <el-input-number v-model="form.op_cnt" controls-position="right"></el-input-number>
                        </el-form-item>
                        <el-button class="add-op" style="margin-right:.9rem" @click="addOtherOp">+ 手术</el-button>
                    </el-row>
                </el-form>
                <el-row>
                    <el-form-item label="呼吸机使用时间" class="w-25">
                        <span>
                            <el-input-number
                                v-model="form.ventilator_duration.days"
                                :controls="false"
                                :min="0"
                                style="width:3rem"
                            ></el-input-number>
                            <label class="el-form-item__label" style="line-height:28px !important">
                                天
                            </label>
                            <el-input-number
                                v-model="form.ventilator_duration.hrs"
                                :controls="false"
                                :min="0"
                                style="width:3rem"
                            ></el-input-number>
                            <label class="el-form-item__label" style="line-height:28px !important">
                                小时
                            </label>
                            <el-input-number
                                v-model="form.ventilator_duration.mins"
                                :controls="false"
                                :min="0"
                                style="width:3rem"
                            ></el-input-number>
                            <label class="el-form-item__label" style="line-height:28px !important">
                                分钟
                            </label>
                        </span>
                    </el-form-item>
                    <el-form-item label="颅脑损伤患者昏迷时间： 入院前" class="ml-6">
                        <span>
                            <el-input-number
                                v-model="form.pre_admit_coma.days"
                                :controls="false"
                                :min="0"
                                style="width:3rem"
                            ></el-input-number>
                            <label class="el-form-item__label" style="line-height:28px !important">
                                天
                            </label>
                            <el-input-number
                                v-model="form.pre_admit_coma.hrs"
                                :controls="false"
                                :min="0"
                                style="width:3rem"
                            ></el-input-number>
                            <label class="el-form-item__label" style="line-height:28px !important">
                                小时
                            </label>
                            <el-input-number
                                v-model="form.pre_admit_coma.mins"
                                :controls="false"
                                :min="0"
                                style="width:3rem"
                            ></el-input-number>
                            <label class="el-form-item__label" style="line-height:28px !important">
                                分钟
                            </label>
                        </span>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="入院后" style="margin-left:40.9rem">
                        <span>
                            <el-input-number
                                v-model="form.post_admit_coma.days"
                                :controls="false"
                                :min="0"
                                style="width:3rem"
                            ></el-input-number>
                            <label class="el-form-item__label" style="line-height:28px !important">
                                天
                            </label>
                            <el-input-number
                                v-model="form.post_admit_coma.hrs"
                                :controls="false"
                                :min="0"
                                style="width:3rem"
                            ></el-input-number>
                            <label class="el-form-item__label" style="line-height:28px !important">
                                小时
                            </label>
                            <el-input-number
                                v-model="form.post_admit_coma.mins"
                                :controls="false"
                                :min="0"
                                style="width:3rem"
                            ></el-input-number>
                            <label class="el-form-item__label" style="line-height:28px !important">
                                分钟
                            </label>
                        </span>
                    </el-form-item>
                </el-row>
                <el-row style="margin:0rem 1rem">
                    <el-row style="width:100%">
                        <p class="sub-subtitle"
                        style="width: 100%; padding:0.2rem; margin:1rem 0 0 0">重症监护病房</p>
                    </el-row>
                    <el-row>
                        <el-form-item label="重症监护病房类型" class="w-18">
                        </el-form-item>
                        <el-form-item label="进重症监护室时间" class="w-13">
                        </el-form-item>
                        <el-form-item label="出重症监护室时间" class="w-15"></el-form-item>
                        <el-form-item label="合计" class="w-8"></el-form-item>
                    </el-row>
                    <el-form-item
                    v-for="(cu) in form.CU_usage"
                    :key="cu.key"
                    >
                        
                        <el-row>
                            <el-form-item class="w-15 mr-3">
                                <el-select v-model="cu.CU_type" placeholder="请选择" style="width:100%">
                                    <el-option
                                        v-for="type in CU_types"
                                        :key="type.value"
                                        :label="type.label"
                                        :value="type.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="w-25 mr-3">
                                <el-date-picker
                                v-model="cu.time"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="起始时间"
                                end-placeholder="结束时间"
                                @change="cuTimeOnChange(cu)"
                                />
                            </el-form-item>
                            <span class="el-form-item__label w-8 mr-1" style="padding-right:0px !important">{{cu.total_hr}}时{{cu.total_min}}分</span>
                            <el-button class="remove-diag" @click.prevent="removeCU(cu)">-</el-button>
                        </el-row>
                        
                    </el-form-item>
                    <el-row justify="end" style="width:100%">
                        <el-button class="add-op" style="margin-right:0rem !important" @click="addCU">+ CU</el-button>
                    </el-row>  
                </el-row>
                <el-row style="margin:0rem 1rem 0rem 1rem">
                    <el-row style="width:100%">
                        <p class="sub-subtitle"
                        style="width: 100%; padding:0.2rem; margin:1rem 0 0 0">输血</p>
                    </el-row>
                    <el-row>
                        <el-form-item label="输血品种" class="w-20">
                        </el-form-item>
                        <el-form-item label="输血量" class="w-20">
                        </el-form-item>
                        <el-form-item label="输血计量单位" class="w-15"></el-form-item>
                    </el-row>
                    <el-form-item
                    v-for="(blood) in form.transfusion"
                    :key="blood.key"
                    >
                        <el-row>
                            <el-form-item class="w-15 mr-5">
                                <el-cascader
                                v-model="blood.blood_type"
                                :options="blood_types"
                                @change="bloodTypeOnChange(blood)"
                                ></el-cascader>
                                
                            </el-form-item>
                            <el-form-item class="w-15 mr-5">
                                <el-input-number 
                                style="width:100%"
                                v-model="blood.blood_volume" 
                                controls-position="right"></el-input-number>
                            </el-form-item>
                            <span class="el-form-item__label w-15" style="padding-right:0px !important">{{blood.volume_unit}}</span>
                            <el-button class="remove-diag" @click.prevent="removeTransfusion(blood)">-</el-button>
                        </el-row>
                        
                    </el-form-item>
                    <el-row justify="end" style="width:100%">
                        <el-button class="add-op" style="margin-right:0rem;" @click="addTransfusion">+ 输血</el-button>
                    </el-row>  
                </el-row>
                <el-row style="margin-top:1rem">
                    <el-form-item label="特级护理天数" class="w-14 mr-1">
                        <el-input-number v-model="form.special_care_days" controls-position="right"></el-input-number>
                    </el-form-item>
                    <el-form-item label="一级护理天数" class="w-14 mr-1">
                        <el-input-number v-model="form.lvl1_care_days" controls-position="right"></el-input-number>
                    </el-form-item>
                    <el-form-item label="二级护理天数" class="w-14 mr-1">
                        <el-input-number v-model="form.lvl2_care_days" controls-position="right"></el-input-number>
                    </el-form-item>
                    <el-form-item label="三级护理天数" class="w-14">
                        <el-input-number v-model="form.lvl3_care_days" controls-position="right"></el-input-number>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="离院方式" class="label-emphasize w-14">
                        <el-select v-model="form.release_type" placeholder="请选择">
                            <el-option
                                v-for="type in release_types"
                                :key="type.value"
                                :label="type.label"
                                :value="type.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <span class="ml-1">
                        <el-form-item v-if="form.release_type===release_types[1].value" label="拟接收医疗机构名称">
                            <el-input v-model="form.accept_hosp_2"></el-input>
                        </el-form-item>
                    </span>
                    <span>
                        <el-form-item v-if="form.release_type===release_types[2].value" label="拟接收医疗机构名称">
                            <el-input v-model="form.accept_hosp_3"></el-input>
                        </el-form-item>
                    </span>

                    <!-- 需根据选项添加内容 -->
                </el-row>
                <el-row>
                    <el-form-item label="有出院31天内再住院计划">
                        <el-checkbox class="mr-1" v-model="form.cont_hosp_check" true-label=true false-label=false ></el-checkbox>
                        <span>
                            <el-input v-if="form.cont_hosp_check=='true'" v-model="form.cont_hosp_plan" placeholder="目的"></el-input>
                        </span>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="主诊医师姓名" class="w-14 mr-1">
                        <el-input v-model="form.physician_name"></el-input>
                    </el-form-item>
                    <el-form-item label="主诊医师代码" class="w-14 mr-1">
                        <el-input v-model="form.physician_code"></el-input>
                    </el-form-item>
                    <el-form-item label="责任护士姓名" class="w-14 mr-1">
                        <el-input v-model="form.nurse_ic_name"></el-input>
                    </el-form-item>
                    <el-form-item label="责任护士代码" class="w-14">
                        <el-input v-model="form.nurse_ic_code"></el-input>
                    </el-form-item>
                </el-row>
                <el-row class="subtitle">
                    <p class="subtitle-line">四、医疗收费信息</p>
                </el-row>
                <el-row>
                    <el-form-item label="业务流水号" class="w-10 mr-3">
                        <el-input v-model="form.biz_sn"></el-input>
                    </el-form-item>
                    <el-form-item label="票据代码" class="w-10 mr-3">
                        <el-input v-model="form.bill_code"></el-input>
                    </el-form-item>
                    <el-form-item label="票据号码" class="w-10 mr-3">
                        <el-input v-model="form.bill_num"></el-input>
                    </el-form-item>
                    <el-form-item label="结算期间" class="w-20">
                        <el-date-picker
                        v-model="form.settle_duration"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="起始日"
                        end-placeholder="结束日"
                        />
                    </el-form-item>
                </el-row>
                <el-row style="padding-left:1rem !important; margin:1rem 0rem 0rem 0rem;">
                    <el-form-item label="项目名称" class="label-emphasize w-5 mr-5">
                    </el-form-item>
                    <el-form-item label="金额" class="w-3 mr-7">
                    </el-form-item>
                    <el-form-item label="甲类" class="w-3 mr-7">
                    </el-form-item>
                    <el-form-item label="乙类" class="w-3 mr-7">
                    </el-form-item>
                    <el-form-item label="自费" class="w-3 mr-7">
                    </el-form-item>
                    <el-form-item label="其他" class="w-5">
                    </el-form-item>
                </el-row>
                    <el-row style="padding-left:1rem !important; margin:0rem 0rem 0rem 0rem;">
                        <el-form-item label="床位费" class="w-5 mr-5">
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.bed_fee.amount"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="amountOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.bed_fee.A"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="AOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.bed_fee.B"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="BOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.bed_fee.self_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="selfPayOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7">
                            <el-input-number
                                v-model="form.bed_fee.other"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="otherOnChange"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem !important; margin:0rem 0rem 0rem 0rem;">
                        <el-form-item label="诊察费" class="w-5 mr-5">
                        </el-form-item>
                        <el-form-item  class="w-7 mr-3">
                            <el-input-number
                                v-model="form.diag_fee.amount"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="amountOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.diag_fee.A"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="AOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.diag_fee.B"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="BOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.diag_fee.self_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="selfPayOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7">
                            <el-input-number
                                v-model="form.diag_fee.other"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="otherOnChange"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem !important; margin:0rem 0rem 0rem 0rem;">
                        <el-form-item label="检查费" class="w-5 mr-5">
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.exam_fee.amount"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="amountOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.exam_fee.A"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="AOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.exam_fee.B"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="BOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.exam_fee.self_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="selfPayOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7">
                            <el-input-number
                                v-model="form.exam_fee.other"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="otherOnChange"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem !important; margin:0rem 0rem 0rem 0rem;">
                        <el-form-item label="化验费" class="w-5 mr-5">
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.lab_test_fee.amount"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="amountOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.lab_test_fee.A"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="AOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.lab_test_fee.B"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="BOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.lab_test_fee.self_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="selfPayOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7">
                            <el-input-number
                                v-model="form.lab_test_fee.other"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="otherOnChange"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem !important; margin:0rem 0rem 0rem 0rem;">
                        <el-form-item label="治疗费" class="w-5 mr-5">
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.treat_fee.amount"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="amountOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.treat_fee.A"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="AOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.treat_fee.B"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="BOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.treat_fee.self_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="selfPayOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7">
                            <el-input-number
                                v-model="form.treat_fee.other"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="otherOnChange"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem !important; margin:0rem 0rem 0rem 0rem;">
                        <el-form-item label="手术费" class="w-5 mr-5">
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.op_fee.amount"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="amountOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.op_fee.A"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="AOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.op_fee.B"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="BOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.op_fee.self_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="selfPayOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7">
                            <el-input-number
                                v-model="form.op_fee.other"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="otherOnChange"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem !important; margin:0rem 0rem 0rem 0rem;">
                        <el-form-item label="护理费" class="w-5 mr-5">
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.nursing_fee.amount"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="amountOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.nursing_fee.A"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="AOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.nursing_fee.B"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="BOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.nursing_fee.self_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="selfPayOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7">
                            <el-input-number
                                v-model="form.nursing_fee.other"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="otherOnChange"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem !important; margin:0rem 0rem 0rem 0rem;">
                        <el-form-item label="卫生材料费" class="w-5 mr-5">
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.med_material_fee.amount"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="amountOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.med_material_fee.A"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="AOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.med_material_fee.B"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="BOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.med_material_fee.self_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="selfPayOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7">
                            <el-input-number
                                v-model="form.med_material_fee.other"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="otherOnChange"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem !important; margin:0rem 0rem 0rem 0rem;">
                        <el-form-item label="西药费" class="w-5 mr-5">
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.western_med_fee.amount"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="amountOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.western_med_fee.A"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="AOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.western_med_fee.B"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="BOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.western_med_fee.self_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="selfPayOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7">
                            <el-input-number
                                v-model="form.western_med_fee.other"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="otherOnChange"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem !important; margin:0rem 0rem 0rem 0rem;">
                        <el-form-item label="中药饮片费" class="w-5 mr-5">
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.traditional_tablet_fee.amount"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="amountOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.traditional_tablet_fee.A"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="AOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.traditional_tablet_fee.B"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="BOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.traditional_tablet_fee.self_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="selfPayOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7">
                            <el-input-number
                                v-model="form.traditional_tablet_fee.other"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="otherOnChange"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem !important; margin:0rem 0rem 0rem 0rem;">
                        <el-form-item label="中成药费" class="w-5 mr-5">
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.traditional_patent_fee.amount"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="amountOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.traditional_patent_fee.A"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="AOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.traditional_patent_fee.B"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="BOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.traditional_patent_fee.self_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="selfPayOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7">
                            <el-input-number
                                v-model="form.traditional_patent_fee.other"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="otherOnChange"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem !important; margin:0rem 0rem 0rem 0rem;">
                        <el-form-item label="一般诊疗费" class="w-5 mr-5">
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.general_diag_fee.amount"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="amountOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.general_diag_fee.A"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="AOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.general_diag_fee.B"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="BOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.general_diag_fee.self_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="selfPayOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7">
                            <el-input-number
                                v-model="form.general_diag_fee.other"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="otherOnChange"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem !important; margin:0rem 0rem 0rem 0rem;">
                        <el-form-item label="挂号费" class="w-5 mr-5">
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.registration_fee.amount"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="amountOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.registration_fee.A"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="AOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.registration_fee.B"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="BOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.registration_fee.self_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="selfPayOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7">
                            <el-input-number
                                v-model="form.registration_fee.other"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="otherOnChange"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem !important; margin:0rem 0rem 0rem 0rem;">
                        <el-form-item label="其他费" class="w-5 mr-5">
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.other_fee.amount"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="amountOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.other_fee.A"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="AOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.other_fee.B"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="BOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.other_fee.self_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="selfPayOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7">
                            <el-input-number
                                v-model="form.other_fee.other"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="otherOnChange"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem !important; margin:0rem 0rem 0rem 0rem;">
                        <el-form-item :label="form.special_fee.title" class="w-5 mr-5">
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.special_fee.amount"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="amountOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.special_fee.A"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="AOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.special_fee.B"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="BOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.special_fee.self_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="selfPayOnChange"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7">
                            <el-input-number
                                v-model="form.special_fee.other"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                @change="otherOnChange"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row style="padding-left:1rem !important; margin:0rem 0rem 0rem 0rem;">
                        <el-form-item label="金额合计" class="w-5 mr-5">
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.total_fee.amount"
                                :precision="2"
                                :controls="false"
                                :min="0"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.total_fee.A"
                                :precision="2"
                                :controls="false"
                                :min="0"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.total_fee.B"
                                :precision="2"
                                :controls="false"
                                :min="0"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7 mr-3">
                            <el-input-number
                                v-model="form.total_fee.self_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item class="w-7">
                            <el-input-number
                                v-model="form.total_fee.other"
                                :precision="2"
                                :controls="false"
                                :min="0"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="医保统筹基金支付" class="w-18" style="margin-top:.5rem">
                            <el-input-number
                                v-model="form.insurance_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                style="width:100%"
                                class="ml-3"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <span>
                            <el-form-item label="补充医疗保险支付" class="label-emphasize w-10"></el-form-item>
                            <el-form-item label="职工大额补助" class="w-15 mr-2">
                                <el-input-number
                                v-model="form.staff_subsidy"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="居民大病保险" class="w-15 mr-2">
                                <el-input-number
                                v-model="form.residence_insurance"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="公务员医疗补助" class="w-15">
                                <el-input-number
                                v-model="form.public_servant_subsidy"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                        </span>
                    </el-row>
                    <el-row>
                        <el-form-item label="医疗救助支付" class="w-18">
                            <el-input-number
                                v-model="form.health_aid_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                style="width:100%; margin-left:4.5rem"
                            ></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <span>
                            <el-form-item label="其他支付" class="label-emphasize w-10"></el-form-item>
                            <el-form-item label="企业补充" class="w-15 mr-2">
                                <el-input-number
                                v-model="form.enterprise_supp"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="商业保险" class="w-15">
                                <el-input-number
                                v-model="form.biz_insurance"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                        </span>
                    </el-row>
                    <el-row>
                        <span>
                            <el-form-item label="个人负担" class="label-emphasize w-10"></el-form-item>
                            <el-form-item label="个人自付" class="w-15 mr-2">
                                <el-input-number
                                v-model="form.partial_self_purchase"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="个人自费" class="w-15">
                                <el-input-number
                                v-model="form.self_purchase"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                        </span>
                    </el-row>
                    <el-row>
                        <span>
                            <el-form-item label="个人支付" class="label-emphasize w-10"></el-form-item>
                            <el-form-item label="个人账户支付" class="w-15 mr-2">
                                <el-input-number
                                v-model="form.account_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="个人现金支付" class="w-15 mr-2">
                                <el-input-number
                                v-model="form.cash_pay"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                        </span>
                    </el-row>
                    <el-row>
                        <el-form-item label="医疗支付方式" class="label-emphasize w-25">
                            <el-select v-model="form.payment_type" placeholder="请选择" style="width:100%;margin-left:4.5rem">
                                <el-option
                                    v-for="type in payment_types"
                                    :key="type.value"
                                    :label="type.label"
                                    :value="type.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="定点医疗机构填报部门" class="w-17 mr-5">
                            <el-input v-model="form.designated_med_report_unit"></el-input>
                        </el-form-item>
                        <el-form-item label="医保经办机构" class="w-17 mr-5">
                            <el-input v-model="form.health_insurance_org"></el-input>
                        </el-form-item>
                        <el-form-item label="代码" class="w-15">
                            <el-input v-model="form.health_insurance_org_code"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="定点医疗机构填报人" class="w-17 mr-5">
                            <el-input v-model="form.designated_med_report_person"></el-input>
                        </el-form-item>
                        <el-form-item label="医保机构经办人" class="w-17 mr-5">
                            <el-input v-model="form.health_insurance_person"></el-input>
                        </el-form-item>
                        <el-form-item label="代码" class="w-15">
                            <el-input v-model="form.health_insurance_person_code"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row justify="end" style="margin-top:2rem;margin-right:0;width:100%;padding-bottom:5rem;">
                        <el-form-item style="float:right !important">
                            <el-button 
                            class="cancel"
                            @click="cancelForm"
                            >取消</el-button>
                        </el-form-item>
                        <el-form-item style="float:right !important">
                            <el-button
                            @click="updateForm"
                            class="ml-1"
                            >保存</el-button>
                        </el-form-item>
                    </el-row>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import type { FormInstance, FormRules } from 'element-plus'
import { regionData, CodeToText } from 'element-china-area-data'
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()
const defaultTime1 = [new Date(2000, 1, 1, 12, 0, 0)]
const setTitle = onMounted(()=>{
    document.title = '结算清单'
})
const getData = onMounted(async()=>{
    const homepage_id = route.params.homepage_id
    console.log('homepage_id:',homepage_id)
    await axios
        .get('/api/v1/view-settlement/',{params:{homepage_id:homepage_id, new: false}})
        .then(response=>{
            console.log(response)
            console.log('settlement:',response.data.settlement)
            // reactive 要对value逐个修改
            form.list_sn = response.data.settlement.list_sn
            form.org_code = response.data.settlement.org_code
            form.org_name = response.data.settlement.org_name
            form.case_num = response.data.settlement.case_num
            form.name = response.data.settlement.name
            form.gender = response.data.settlement.birthday
            form.age = response.data.settlement.age
            form.nationality = response.data.settlement.nationality
            form.ethnicity = response.data.settlement.ethnicity
            form.id_type = response.data.settlement.id_type
            form.id_card_num = response.data.settlement.id_card_num
            form.profession = response.data.settlement.profession
            form.present_addr1 = response.data.settlement.present_addr1
            form.present_addr2 = response.data.settlement.present_addr2
            form.work_addr1 = response.data.settlement.work_addr1
            form.work_addr2 = response.data.settlement.work_addr2
            form.work_phone = response.data.settlement.work_phone
            form.work_zip = response.data.settlement.work_zip
            form.contact_name = response.data.settlement.contact_name
            form.contact_relation = response.data.settlement.contact_relation
            form.contact_addr1 = response.data.settlement.contact_addr1
            form.contact_addr2 = response.data.settlement.contact_addr2
            form.contact_phone = response.data.settlement.contact_phone
            form.newborn_birth_weight = response.data.settlement.newborn_birth_weight
            form.newborn_admit_weight = response.data.settlement.newborn_admit_weight
            form.admit_path = response.data.settlement.admit_path
            form.admit_specialty = response.data.settlement.admit_specialty
            form.trans_specialty = response.data.settlement.trans_specialty
            form.release_time = response.data.settlement.release_time
            form.release_specialty = response.data.settlement.release_specialty
            form.hosp_duration = response.data.settlement.hosp_duration
            form.head_injury_check = response.data.settlemeent.head_injury_check
            form.pre_admit_coma = response.data.settlement.pre_admit_coma
            form.post_admit_coma = response.data.settlement.post_admit_coma
            form.release_type = response.data.settlement.release_type
            form.cont_hosp_check = response.data.settlement.cont_hosp_check
            form.cont_hosp_plan = response.data.settlement.cont_hosp_plan
            // pink
            form.physician_name = response.data.settlement.physician_name
            form.nurse_ic_name = response.data.settlement.nurse_ic_name

            console.log('updated form:',form)
        }).catch(error=>{
            console.log(error)
        })
})
const getChinaData = ()=>{
    if(regionData[regionData.length-1].label != '其他') {
        regionData.push({value: '000000', label: '其他'})
    }
    return regionData
}
const amountOnChange = ()=>{
    form.total_fee.amount = form.bed_fee.amount
    +form.diag_fee.amount
    +form.exam_fee.amount
    +form.lab_test_fee.amount
    +form.treat_fee.amount
    +form.op_fee.amount
    +form.nursing_fee.amount
    +form.med_material_fee.amount
    +form.western_med_fee.amount
    +form.traditional_tablet_fee.amount
    +form.traditional_patent_fee.amount
    +form.general_diag_fee.amount
    +form.registration_fee.amount
    +form.other_fee.amount
    +form.special_fee.amount
}
const AOnChange = ()=>{
    form.total_fee.A = form.bed_fee.A
    +form.diag_fee.A
    +form.exam_fee.A
    +form.lab_test_fee.A
    +form.treat_fee.A
    +form.op_fee.A
    +form.nursing_fee.A
    +form.med_material_fee.A
    +form.western_med_fee.A
    +form.traditional_tablet_fee.A
    +form.traditional_patent_fee.A
    +form.general_diag_fee.A
    +form.registration_fee.A
    +form.other_fee.A
    +form.special_fee.A
}
const BOnChange = ()=>{
    form.total_fee.B = form.bed_fee.B
    +form.diag_fee.B
    +form.exam_fee.B
    +form.lab_test_fee.B
    +form.treat_fee.B
    +form.op_fee.B
    +form.nursing_fee.B
    +form.med_material_fee.B
    +form.western_med_fee.B
    +form.traditional_tablet_fee.B
    +form.traditional_patent_fee.B
    +form.general_diag_fee.B
    +form.registration_fee.B
    +form.other_fee.B
    +form.special_fee.B
}
const selfPayOnChange = ()=>{
    form.total_fee.self_pay = form.bed_fee.self_pay
    +form.diag_fee.self_pay
    +form.exam_fee.self_pay
    +form.lab_test_fee.self_pay
    +form.treat_fee.self_pay
    +form.op_fee.self_pay
    +form.nursing_fee.self_pay
    +form.med_material_fee.self_pay
    +form.western_med_fee.self_pay
    +form.traditional_tablet_fee.self_pay
    +form.traditional_patent_fee.self_pay
    +form.general_diag_fee.self_pay
    +form.registration_fee.self_pay
    +form.other_fee.self_pay
    +form.special_fee.self_pay
}
const otherOnChange = ()=>{
    form.total_fee.other = form.bed_fee.other
    +form.diag_fee.other
    +form.exam_fee.other
    +form.lab_test_fee.other
    +form.treat_fee.other
    +form.op_fee.other
    +form.nursing_fee.other
    +form.med_material_fee.other
    +form.western_med_fee.other
    +form.traditional_tablet_fee.other
    +form.traditional_patent_fee.other
    +form.general_diag_fee.other
    +form.registration_fee.other
    +form.other_fee.other
    +form.special_fee.other
}
const addTransfusion = ()=>{
    form.transfusion.push({
        blood_type: '',
        blood_volume: 0,
        volume_unit: '',
    })
}
const removeTransfusion = (blood)=>{
    let index = form.transfusion.indexOf(blood)
    if(index != -1) {
        form.transfusion.splice(index, 1)
    }
}
const addCU = ()=>{
    form.CU_usage.push({
        CU_type: '',
        time: '',
        total_hr: 0,
        total_min: 0,
    })
}
const removeCU = (cu)=>{
    let index = form.CU_usage.indexOf(cu)
    if(index != -1) {
        form.CU_usage.splice(index, 1)
    }
}
const addDiagInfo = (info)=>{
    form.diag_info.push({
        disease_name: '',
        disease_code: '',
        op_name: '',
        op_code: '',
        key: Date.now(),
    })
}
const removeDiagInfo = (info)=>{
    let index = form.diag_info.indexOf(info)
    if(index != -1) {
        form.diag_info.splice(index, 1)
    }
}
const addWRDiag = (info)=>{
    form.western_release.other_diags.push({
        diag: '',
        disease_code: '',
        admit_condition: '',
    })
}
const removeWRDiag = (info)=>{
    let index = form.western_release.other_diags.indexOf(info)
    if(index != -1) {
        form.western_release.other_diags.splice(index, 1)
    }
}
const addTRDiag = (info)=>{
    form.traditional_release.main_symps.push({
        diag: '',
        disease_code: '',
        admit_condition: '',
    })
}
const removeTRDiag = (info)=>{
    console.log(info)
    let index = form.traditional_release.other_diags.indexOf(info)
    if(index != -1) {
        form.traditional_release.main_symps.splice(index, 1)
    }
}
const addOtherOp = (op)=>{
    form.other_ops.push({
        name: '',
        code: '',
        anaesthesia_type: '',
        operator_name: '',
        operator_code: '',
        anaesthetist_name: '',
        anaesthetist_code: '',
        op_time: [],
        anaesthesia_time: '',
    })
}
const removeOtherOp = (op)=>{
    let index = form.other_ops.indexOf(op)
    if(index != -1) {
        form.other_ops.splice(index, 1)
    }
}
const test = ()=>{
    console.log(form.heal_type)
    console.log(form.heal_type[0])
}
const formRef = ref<FormInstance>()
let form:any = reactive({
    list_sn: '',
    org_name: '',
    org_code: '',
    settlement_lvl: '',
    settlement_num: '',
    case_num: '',
    report_time: '',
    // 基本信息
    name: '',
    gender: '',
    birthday: '',
    age: 0,
    nationality: '',
    age_in_day: '',
    ethnicity: '',
    id_type: '',
    id_card_num: '',
    passport_num: '',
    officer_num: '',
    profession: '',
    present_addr1: [],
    present_addr2: '',
    work_addr1: [],
    work_addr2: '',
    work_phone: '',
    work_zip: '',
    contact_name: '',
    contact_relation: '',
    contact_addr1: [],
    contact_addr2: '',
    contact_phone: '',
    settlement_type: '',
    special_person_type: '',
    settlement_loc: '',
    newborn_check: false,
    newborn_admit_type: '',
    newborn_birth_weight: 0.0,
    newborn_admit_weight: 0.0,
    // 门诊慢特病诊疗信息
    diag_specialty: '',
    diag_date: '',
    diag_info: [
        {
            disease_name: '',
            disease_code: '',
            op_name: '',
            op_code: '',
        },
    ],
    // 住院诊疗信息
    hosp_reason: '',
    admit_path: '',
    heal_type: '',
    admit_time: '',
    admit_specialty: [],
    trans_specialty: [],
    release_time: '',
    release_specialty: [],
    hosp_duration: 0,
    w_emergency_diag: '',
    w_disease_code: '',
    western_release: {
        main_diag: {
            diag: '',
            disease_code: '',
            admit_condition: '',
        },
        other_diags: [
            {
                diag: '',
                disease_code: '',
                admit_condition: '',
            },
        ],
    },
    traditional_release: {
        main_disease: {
            disease_code: '',
            admit_condition: '',
        },
        main_symps: [
            {
                disease_code: '',
                admit_condition: '',
            },
        ],
    },
    diag_cnt: 0,
    main_op: {
        name: '',
        code: '',
        anaesthesia_type: '',
        operator_name: '',
        operator_code: '',
        anaesthetist_name: '',
        anaesthetist_code: '',
        op_time: [],
        anaesthesia_time: '',
    },
    other_ops: [
        {
            name: '',
            code: '',
            anaesthesia_type: '',
            operator_name: '',
            operator_code: '',
            anaesthetist_name: '',
            anaesthetist_code: '',
            op_time: [],
            anaesthesia_time: '',
        }
    ],
    op_cnt: 0,
    ventilator_duration: {
        days: 0,
        hrs: 0,
        mins: 0,
    }, //
    head_injury_check: false,
    pre_admit_coma: {
        days: 0,
        hrs: 0,
        mins: 0
    },
    post_admit_coma: {
        days: 0,
        hrs: 0,
        mins: 0
    },
    CU_usage: [
        {
            CU_type: '',
            time: '',
            total_hr: 0,
            total_min: 0,
        },
    ],
    transfusion: [
        {
            blood_type: '',
            blood_volume: 0,
            volume_unit: '',
        },
    ],
    special_care_days: 0,
    l1_care_days: 0,
    l2_care_days: 0,
    l3_care_days: 0,
    release_type: '',
    cont_hosp_check: false,
    cont_hosp_plan: '',
    physician_name: '',
    physician_code: '',
    nurse_ic_name: '',
    nurse_ic_code: '',
    // 医疗收费信息
    biz_sn: '',
    bill_code: '',
    bill_num: '',
    settle_duration: '',
    bed_fee: {
        amount: 0.0,
        A: 0.0,
        B: 0.0,
        self_pay: 0.0,
        other: 0.0,
    },
    diag_fee: {
        amount: 0.0,
        A: 0.0,
        B: 0.0,
        self_pay: 0.0,
        other: 0.0,
    },
    exam_fee: {
        amount: 0.0,
        A: 0.0,
        B: 0.0,
        self_pay: 0.0,
        other: 0.0,
    },
    lab_test_fee: {
        amount: 0.0,
        A: 0.0,
        B: 0.0,
        self_pay: 0.0,
        other: 0.0,
    },
    treat_fee: {
        amount: 0.0,
        A: 0.0,
        B: 0.0,
        self_pay: 0.0,
        other: 0.0,
    },
    op_fee: {
        amount: 0.0,
        A: 0.0,
        B: 0.0,
        self_pay: 0.0,
        other: 0.0,
    },
    nursing_fee: {
        amount: 0.0,
        A: 0.0,
        B: 0.0,
        self_pay: 0.0,
        other: 0.0,
    },
    med_material_fee: {
        amount: 0.0,
        A: 0.0,
        B: 0.0,
        self_pay: 0.0,
        other: 0.0,
    },
    western_med_fee: {
        amount: 0.0,
        A: 0.0,
        B: 0.0,
        self_pay: 0.0,
        other: 0.0,
    },
    traditional_tablet_fee: {
        amount: 0.0,
        A: 0.0,
        B: 0.0,
        self_pay: 0.0,
        other: 0.0,
    },
    traditional_patent_fee: {
        amount: 0.0,
        A: 0.0,
        B: 0.0,
        self_pay: 0.0,
        other: 0.0,
    },
    general_diag_fee: {
        amount: 0.0,
        A: 0.0,
        B: 0.0,
        self_pay: 0.0,
        other: 0.0,
    },
    registration_fee: {
        amount: 0.0,
        A: 0.0,
        B: 0.0,
        self_pay: 0.0,
        other: 0.0,
    },
    other_fee: {
        amount: 0.0,
        A: 0.0,
        B: 0.0,
        self_pay: 0.0,
        other: 0.0,
    },
    special_fee: {
            title: '',
            amount: 0.0,
            A: 0.0,
            B: 0.0,
            self_pay: 0.0,
            other: 0.0,
    },
    total_fee: {
        amount: 0.0,
        A: 0.0,
        B: 0.0,
        self_pay: 0.0,
        other: 0.0,
    },
    insurance_pay: 0.0,
    staff_subsidy: 0.0,
    residence_insurance: 0.0,
    public_servant_subsidy: 0.0,
    health_aid_pay: 0.0,
    enterprise_supp: 0.0,
    self_purchase: 0.0,
    account_pay: 0.0,
    cash_pay: 0.0,
    payment_type: '',
    designated_med_report_unit: '',
    designated_med_report_person: '',
    health_insurance_org: '',
    health_insurance_org_code: '',
    health_insurance_person: '',
    health_insurance_person_code: '',
})
const formRules = reactive({
})
const release_heal_type = ref('1')
const release_heal_types = [
    {
        value: '1',
        label: '西医',
    },
    {
        value: '2',
        label: '中医',
    },
]
const loadStandard = onMounted(async ()=>{
    await axios.get('/api/v1/get-standard/specialty')
        .then(response=>{
            console.log('appliedspstd:',response)
            specialties.value = response.data.specialties
            console.log('current specialties:',specialties)
        })
        .catch(error=>{
            console.log(error)
        })
})
const genders = [
    {
        value: '1',
        label: '男'
    },
    {
        value: '2',
        label: '女'
    }
]
const countries = [
    {
        label: '热门国家',
        options: [{value:'China',label:'中国'},]
    },{
        label: '所有国家',
        options: [
            {value:'Angola',label:'安哥拉'},
            {value:'Afghanistan',label:'阿富汗'},
            {value:'Albania',label:'阿尔巴尼亚'},
            {value:'Algeria',label:'阿尔及利亚'},
            {value:'Andorra',label:'安道尔共和国'},
            {value:'Anguilla',label:'安圭拉岛'},
            {value:'Antigua and Barbuda',label:'安提瓜和巴布达'},
            {value:'Argentina',label:'阿根廷'},
            {value:'Armenia',label:'亚美尼亚'},
            {value:'Ascension',label:'阿森松'},
            {value:'Australia',label:'澳大利亚'},
            {value:'Austria',label:'奥地利'},
            {value:'Azerbaijan',label:'阿塞拜疆'},
            {value:'Bahamas',label:'巴哈马'},
            {value:'Bahrain',label:'巴林'},
            {value:'Bangladesh',label:'孟加拉国'},
            {value:'Barbados',label:'巴巴多斯'},
            {value:'Belarus',label:'白俄罗斯'},
            {value:'Belgium',label:'比利时'},
            {value:'Belize',label:'伯利兹'},
            {value:'Benin',label:'贝宁'},
            {value:'Bermuda Is',label:'百慕大群岛'},
            {value:'Bolivia',label:'玻利维亚'},
            {value:'Botswana',label:'博茨瓦纳'},
            {value:'Brazil',label:'巴西'},
            {value:'Brunei',label:'文莱'},
            {value:'Bulgaria',label:'保加利亚'},
            {value:'Burkina Faso',label:'布基纳法索'},
            {value:'Burma',label:'缅甸'},
            {value:'Burundi',label:'布隆迪'},
            {value:'Cameroon',label:'喀麦隆'},
            {value:'Canada',label:'加拿大'},
            {value:'Cayman Is',label:'开曼群岛'},
            {value:'Central African Republic',label:'中非共和国'},
            {value:'Chad',label:'乍得'},
            {value:'Chile',label:'智利'},
            {value:'China',label:'中国'},
            {value:'Colombia',label:'哥伦比亚'},
            {value:'Congo',label:'刚果'},
            {value:'Cook Is',label:'库克群岛'},
            {value:'Costa Rica',label:'哥斯达黎加'},
            {value:'Cuba',label:'古巴'},
            {value:'Cyprus',label:'塞浦路斯'},
            {value:'Czech Republic',label:'捷克'},
            {value:'Denmark',label:'丹麦'},
            {value:'Djibouti',label:'吉布提'},
            {value:'Dominica Rep',label:'多米尼加共和国'},
            {value:'Ecuador',label:'厄瓜多尔'},
            {value:'Egypt',label:'埃及'},
            {value:'EI Salvador',label:'萨尔瓦多'},
            {value:'Estonia',label:'爱沙尼亚'},
            {value:'Ethiopia',label:'埃塞俄比亚'},
            {value:'Fiji',label:'斐济'},
            {value:'Finland',label:'芬兰'},
            {value:'France',label:'法国'},
            {value:'French Guiana',label:'法属圭亚那'},
            {value:'French Polynesia',label:'法属玻利尼西亚'},
            {value:'Gabon',label:'加蓬'},
            {value:'Gambia',label:'冈比亚'},
            {value:'Georgia',label:'格鲁吉亚'},
            {value:'Germany',label:'德国'},
            {value:'Ghana',label:'加纳'},
            {value:'Gibraltar',label:'直布罗陀'},
            {value:'Greece',label:'希腊'},
            {value:'Grenada',label:'格林纳达'},
            {value:'Guam',label:'关岛'},
            {value:'Guatemala',label:'危地马拉'},
            {value:'Guinea',label:'几内亚'},
            {value:'Guyana',label:'圭亚那'},
            {value:'Haiti',label:'海地'},
            {value:'Honduras',label:'洪都拉斯'},
            {value:'Hungary',label:'匈牙利'},
            {value:'Iceland',label:'冰岛'},
            {value:'India',label:'印度'},
            {value:'Indonesia',label:'印度尼西亚'},
            {value:'Iran',label:'伊朗'},
            {value:'Iraq',label:'伊拉克'},
            {value:'Ireland',label:'爱尔兰'},
            {value:'Israel',label:'以色列'},
            {value:'Italy',label:'意大利'},
            {value:'Ivory Coast',label:'科特迪瓦'},
            {value:'Jamaica',label:'牙买加'},
            {value:'Japan',label:'日本'},
            {value:'Jordan',label:'约旦'},
            {value:'Kampuchea (Cambodia )',label:'柬埔寨'},
            {value:'Kazakstan',label:'哈萨克斯坦'},
            {value:'Kenya',label:'肯尼亚'},
            {value:'Korea',label:'韩国'},
            {value:'Kuwait',label:'科威特'},
            {value:'Kyrgyzstan',label:'吉尔吉斯坦'},
            {value:'Laos',label:'老挝'},
            {value:'Latvia',label:'拉脱维亚'},
            {value:'Lebanon',label:'黎巴嫩'},
            {value:'Lesotho',label:'莱索托'},
            {value:'Liberia',label:'利比里亚'},
            {value:'Libya',label:'利比亚'},
            {value:'Liechtenstein',label:'列支敦士登'},
            {value:'Lithuania',label:'立陶宛'},
            {value:'Luxembourg',label:'卢森堡'},
            {value:'Madagascar',label:'马达加斯加'},
            {value:'Malawi',label:'马拉维'},
            {value:'Malaysia',label:'马来西亚'},
            {value:'Maldives',label:'马尔代夫'},
            {value:'Mali',label:'马里'},
            {value:'Malta',label:'马耳他'},
            {value:'Mariana Is',label:'马里亚那群岛'},
            {value:'Martinique',label:'马提尼克'},
            {value:'Mauritius',label:'毛里求斯'},
            {value:'Mexico',label:'墨西哥'},
            {value:'Moldova',label:'摩尔多瓦'},
            {value:'Monaco',label:'摩纳哥'},
            {value:'Mongolia',label:'蒙古'},
            {value:'Montserrat Is',label:'蒙特塞拉特岛'},
            {value:'Morocco',label:'摩洛哥'},
            {value:'Mozambique',label:'莫桑比克'},
            {value:'Namibia',label:'纳米比亚'},
            {value:'Nauru',label:'瑙鲁'},
            {value:'Nepal',label:'尼泊尔'},
            {value:'Netheriands Antilles',label:'荷属安的列斯'},
            {value:'Netherlands',label:'荷兰'},
            {value:'New Zealand',label:'新西兰'},
            {value:'Nicaragua',label:'尼加拉瓜'},
            {value:'Niger',label:'尼日尔'},
            {value:'Nigeria',label:'尼日利亚'},
            {value:'North Korea',label:'朝鲜'},
            {value:'Norway',label:'挪威'},
            {value:'Oman',label:'阿曼'},
            {value:'Pakistan',label:'巴基斯坦'},
            {value:'Panama',label:'巴拿马'},
            {value:'Papua New Cuinea',label:'巴布亚新几内亚'},
            {value:'Paraguay',label:'巴拉圭'},
            {value:'Peru',label:'秘鲁'},
            {value:'Philippines',label:'菲律宾'},
            {value:'Poland',label:'波兰'},
            {value:'Portugal',label:'葡萄牙'},
            {value:'Puerto Rico',label:'波多黎各'},
            {value:'Qatar',label:'卡塔尔'},
            {value:'Reunion',label:'留尼旺'},
            {value:'Romania',label:'罗马尼亚'},
            {value:'Russia',label:'俄罗斯'},
            {value:'Saint Lueia',label:'圣卢西亚'},
            {value:'Saint Vincent',label:'圣文森特岛'},
            {value:'Samoa Eastern',label:'东萨摩亚(美)'},
            {value:'Samoa Western',label:'西萨摩亚'},
            {value:'San Marino',label:'圣马力诺'},
            {value:'Sao Tome and Principe',label:'圣多美和普林西比'},
            {value:'Saudi Arabia',label:'沙特阿拉伯'},
            {value:'Senegal',label:'塞内加尔'},
            {value:'Seychelles',label:'塞舌尔'},
            {value:'Sierra Leone',label:'塞拉利昂'},
            {value:'Singapore',label:'新加坡'},
            {value:'Slovakia',label:'斯洛伐克'},
            {value:'Slovenia',label:'斯洛文尼亚'},
            {value:'Solomon Is',label:'所罗门群岛'},
            {value:'Somali',label:'索马里'},
            {value:'South Africa',label:'南非'},
            {value:'Spain',label:'西班牙'},
            {value:'SriLanka',label:'斯里兰卡'},
            {value:'St.Lucia',label:'圣卢西亚'},
            {value:'St.Vincent',label:'圣文森特'},
            {value:'Sudan',label:'苏丹'},
            {value:'Suriname',label:'苏里南'},
            {value:'Swaziland',label:'斯威士兰'},
            {value:'Sweden',label:'瑞典'},
            {value:'Switzerland',label:'瑞士'},
            {value:'Syria',label:'叙利亚'},
            {value:'Tajikstan',label:'塔吉克斯坦'},
            {value:'Tanzania',label:'坦桑尼亚'},
            {value:'Thailand',label:'泰国'},
            {value:'Togo',label:'多哥'},
            {value:'Tonga',label:'汤加'},
            {value:'Trinidad and Tobago',label:'特立尼达和多巴哥'},
            {value:'Tunisia',label:'突尼斯'},
            {value:'Turkey',label:'土耳其'},
            {value:'Turkmenistan',label:'土库曼斯坦'},
            {value:'Uganda',label:'乌干达'},
            {value:'Ukraine',label:'乌克兰'},
            {value:'United Arab Emirates',label:'阿拉伯联合酋长国'},
            {value:'United Kiongdom',label:'英国'},
            {value:'United States of America',label:'美国'},
            {value:'Uruguay',label:'乌拉圭'},
            {value:'Uzbekistan',label:'乌兹别克斯坦'},
            {value:'Venezuela',label:'委内瑞拉'},
            {value:'Vietnam',label:'越南'},
            {value:'Yemen',label:'也门'},
            {value:'Yugoslavia',label:'南斯拉夫'},
            {value:'Zimbabwe',label:'津巴布韦'},
            {value:'Zaire',label:'扎伊尔'},
            {value:'Zambia',label:'赞比亚'}
        ]
}]
const ethnicities = [
    {
    id: 1,
    info: "汉族",
    },
    {
    id: 2,
    info: "壮族",
    },
    {
    id: 3,
    info: "满族",
    },
    {
    id: 4,
    info: "回族",
    value: 4,
    },
    {
    id: 5,
    info: "苗族",
    },
    {
    id: 6,
    info: "维吾尔族",
    },
    {
    id: 7,
    info: "土家族",
    },
    {
    id: 8,
    info: "彝族",
    },
    {
    id: 9,
    info: "蒙古族",
    },
    {
    id: 10,
    info: "藏族",
    },
    {
    id: 11,
    info: "布依族",
    },
    {
    id: 12,
    info: "侗族",
    },
    {
    id: 13,
    info: "瑶族",
    },
    {
    id: 14,
    info: "朝鲜族",
    },
    {
    id: 15,
    info: "白族",
    },
    {
    id: 16,
    info: "哈尼族",
    },
    {
    id: 17,
    info: "哈萨克族",
    },
    {
    id: 18,
    info: "黎族",
    },
    {
    id: 19,
    info: "傣族",
    },
    {
    id: 20,
    info: "畲族",
    },
    {
    id: 21,
    info: "傈僳族",
    },
    {
    id: 22,
    info: "仡佬族",
    },
    {
    id: 23,
    info: "东乡族",
    },
    {
    id: 24,
    info: "高山族",
    },
    {
    id: 25,
    info: "拉祜族",
    },
    {
    id: 26,
    info: "水族",
    },
    {
    id: 27,
    info: "佤族",
    },
    {
    id: 28,
    info: "纳西族",
    },
    {
    id: 29,
    info: "羌族",
    },
    {
    id: 30,
    info: "土族",
    },
    {
    id: 31,
    info: "仫佬族",
    },
    {
    id: 32,
    info: "锡伯族",
    },
    {
    id: 33,
    info: "柯尔克孜族",
    },
    {
    id: 34,
    info: "达斡尔族",
    },
    {
    id: 35,
    info: "景颇族",
    },
    {
    id: 36,
    info: "毛南族",
    },
    {
    id: 37,
    info: "撒拉族",
    },
    {
    id: 38,
    info: "布朗族",
    },
    {
    id: 39,
    info: "塔吉克族",
    },
    {
    id: 40,
    info: "阿昌族",
    },
    {
    id: 41,
    info: "普米族",
    },
    {
    id: 42,
    info: "鄂温克族",
    },
    {
    id: 43,
    info: "怒族",
    },
    {
    id: 44,
    info: "京族",
    },
    {
    id: 45,
    info: "基诺族",
    },
    {
    id: 46,
    info: "德昂族",
    },
    {
    id: 47,
    info: "保安族",
    },
    {
    id: 48,
    info: "俄罗斯族",
    },
    {
    id: 49,
    info: "裕固族",
    },
    {
    id: 50,
    info: "乌孜别克族",
    },
    {
    id: 51,
    info: "门巴族",
    },
    {
    id: 52,
    info: "鄂伦春族",
    },
    {
    id: 53,
    info: "独龙族",
    },
    {
    id: 54,
    info: "塔塔尔族",
    },
    {
    id: 55,
    info: "赫哲族",
    },
    {
    id: 56,
    info: "珞巴族",
    },
    // 版权声明：本文为CSDN博主「码农陈冠希」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
    // 原文链接：https://blog.csdn.net/qq_48895397/article/details/121249251
]
const id_types = [
    {
        value: '1',
        label: '身份证',
    },
    {
        value: '2',
        label: '护照',
    },
    {
        value: '3',
        label: '军官证',
    },
]
const professions = [
    {
        value: '11',
        label: '国家公务员'
    },
    {
        value: '13',
        label: '专业技术人员'
    },
    {
        value: '17',
        label: '职员'
    },
    {
        value: '21',
        label: '企业管理人员'
    },
    {
        value: '24',
        label: '工人'
    },
    {
        value: '27',
        label: '农民'
    },
    {
        value: '31',
        label: '学生'
    },
    {
        value: '37',
        label: '现役军人'
    },
    {
        value: '51',
        label: '自由职业者'
    },
    {
        value: '54',
        label: '个体经营者'
    },
    {
        value: '70',
        label: '无业人员'
    },
    {
        value: '80',
        label: '退（离）修人员'
    },
    {
        value: '90',
        label: '其他'
    },
]
const locations = getChinaData()
const contact_relations = [
    {
        value: '1',
        label: '配偶',
        disabled: true
    },
    {
        value: '2',
        label: '子'
    },
    {
        value: '3',
        label: '女'
    },
    {
        value: '4',
        label: '孙子，孙女或外孙子，外孙女'
    },
    {
        value: '5',
        label: '父母'
    },
    {
        value: '6',
        label: '祖父母或外祖父母'
    },
    {
        value: '8',
        label: '其他'
    }
]
const settlement_types = [
    {
        value: '1',
        label: '职工基本医疗保险',
    },
    {
        value: '2',
        label: '城乡居民基本医疗保险',
    },
    {
        value: '3',
        label: '其他医疗保障',
    },
]
const special_person_types = [
    {
        value: '1',
        label: '特困人员',
    },
    {
        value: '2',
        label: '低保对象',
    },
    {
        value: '3',
        label: '返贫致贫人口',
    },
    {
        value: '4',
        label: '其他困难群众',
    },
]
const newborn_admit_types = [
    {
        value: '1',
        label: '正常新生儿',
    },
    {
        value: '2',
        label: '早产儿',
    },
    {
        value: '3',
        label: '有疾病新生儿',
    },
    {
        value: '4',
        label: '非无菌分娩',
    },
    {
        value: '9',
        label: '其他',
    },
]
const hosp_reasons = [
    {
        value: '1',
        label: '住院',
    },
    {
        value: '2',
        label: '日间手术',
    }
]
const admit_paths = [
    {
        value: '1',
        label: '急诊'
    },
    {
        value: '2',
        label: '门诊'
    },
    {
        value: '3',
        label: '其他医疗机构转入'
    },
    {
        value: '9',
        label: '其他'
    }
]
const heal_types = [
    {
        value: '1',
        label: '西医'
    },
    {
        value: '2',
        label: '中医',
        children: [
            {
                value: '1',
                label: '中医',
            },
            {
                value: '2',
                label: '民族医',
            }
        ]
    },
    {
        value: '3',
        label: '中西医'
    },
]
const anaesthesia_types = [
    {
        value: '1',
        label: '全麻'
    },
    {
        value: '2',
        label: '局麻'
    },
    {
        value: '3',
        label: '硬膜外麻'
    },
]
const CU_types = [
    {
        value: '1',
        label: '心脏重症监护病房（CCU）'
    },
    {
        value: '2',
        label: '新生儿重症监护病房（NICU）'
    },
    {
        value: '3',
        label: '急诊重症监护病房（ECU）'
    },
    {
        value: '4',
        label: '外科重症监护病房（SICU）'
    },
    {
        value: '5',
        label: '儿科重症监护病房（PICU）'
    },
    {
        value: '6',
        label: '呼吸重症监护病房（RICU）'
    },
    {
        value: '7',
        label: 'ICU（综合）'
    },
    {
        value: '9',
        label: '其他'
    },
]
const blood_types = [
    {
        value: '1',
        label: '红细胞',
        children: [
            {
                value: '11',
                label: '浓缩红细胞',
            },
            {
                value: '12',
                label: '滤白红细胞',
            },
            {
                value: '13',
                label: '红细胞悬液',
            },
            {
                value: '14',
                label: '洗涤红细胞',
            },
            {
                value: '15',
                label: '冰冻红细胞',
            },
            {
                value: '16',
                label: '冰冻解冻去甘油红细胞',
            },
            {
                value: '17',
                label: 'Rh 阴性悬浮红细胞',
            },
        ]
    },
    {
        value: '2',
        label: '全血',
        children: [
            {
                value: '21',
                label: '滤白全血',
            },
            {
                value: '22',
                label: '重组全血',
            },
            {
                value: '23',
                label: 'Rh 阴性全血',
            },
        ]
    },
    {
        value: '3',
        label: '血小板',
        children: [
            {
                value: '31',
                label: '手工分离浓缩血小板',
            },
            {
                value: '32',
                label: '机采血小板',
            },
            {
                value: '33',
                label: '滤白机采血小板',
            },
            {
                value: '34',
                label: '冷冻机采血小板',
            },
        ]
    },
    {
        value: '4',
        label: '血浆',
        children: [
            {
                value: '41',
                label: '新鲜液体血浆',
            },
            {
                value: '42',
                label: '新鲜冰冻血浆',
            },
            {
                value: '43',
                label: '普通冰冻血浆',
            },
            {
                value: '44',
                label: '滤白病毒灭活冰冻血浆',
            },
            {
                value: '45',
                label: '滤白新鲜冰冻血浆',
            },
            {
                value: '46',
                label: '滤白普通冰冻血浆',
            },
        ]
    },
    {
        value: '5',
        label: '冷沉淀',
        children: [
            {
                value: '51',
                label: '滤白冷沉淀',
            },
        ]
    },
    {
        value: '6',
        label: '机采浓缩白细胞悬液',
    },
    {
        value: '9',
        label: '其他',
    },
]
const release_types = [
    {
        value: '1',
        label: '医嘱离院'
    },
    {
        value: '2',
        label: '医嘱转院'
    },
    {
        value: '3',
        label: '医嘱转社区卫生服务机构/乡镇卫生院'
    },
    {
        value: '4',
        label: '非医嘱离院'
    },
    {
        value: '5',
        label: '死亡'
    },
    {
        value: '6',
        label: '其他'
    },
]
const payment_types = [
    {
        value: '1',
        label: '按项目付费'
    },
    {
        value: '2',
        label: '按单病种付费'
    },
    {
        value: '3',
        label: '按病种分值付费'
    },
    {
        value: '4',
        label: '按疾病诊断相关分组（DRG）付费'
    },
    {
        value: '5',
        label: '按床日付费'
    },
    {
        value: '6',
        label: '按人头付费'
    },
    {
        value: '7',
        label: '按定额'
    },
]
let specialties = ref([])

const bloodTypeOnChange = blood => {
    const unit_U = ['11','12','13','14','15','16','17','31','51']
    const unit_Ml = ['21','22','23','41','42','43','44','45','46','9']
    const unit_ZLL = ['32','33','34','6']
    let blood_type = blood.blood_type[blood.blood_type.length-1]
    console.log(blood_type)
    if(unit_U.includes(blood_type)) {
        blood.volume_unit = 'U'
    } else if(unit_Ml.includes(blood_type)) {
        blood.volume_unit = 'Ml'
    } else if(unit_ZLL.includes(blood_type)) {
        blood.volume_unit = '治疗量'
    }
}
const cuTimeOnChange = cu=>{
    console.log(cu)
    const duration = (cu.time[1]-cu.time[0])/(60*1000)
    cu.total_hr = Math.floor(duration/60)
    cu.total_min = duration%60
    console.log('total hr:'+cu.total_hr)
    console.log('total min:'+cu.total_min)
    console.log(form.CU_usage)
}
const idNumVal = computed({
    get() {
        if(form.id_type==='1')
            return form.id_card_num
        else if(form.id_type==='2')
            return form.passport_num
        else if(form.id_type==='3')
            return form.officer_num
    },
    set(val) {
        if(form.id_type==='1')
            form.id_card_num = val
        else if(form.id_type==='2')
            form.passport_num = val
        else if(form.id_type==='3')
            form.officer_num = val
    }
})
const presentAddrOnChange = (val)=>{
    console.log(val)
    // this.form.present_zip = val[val.length-1]
    // console.log(this.form.present_zip)
}
const getHospDuration = ()=>{
    if(form.hosp_duration<0)
        return '请输入入院和出院时间'
    else
        return form.hosp_duration
}
const disabledDate0 = time=>{
    // let return_val = time.getTime() > Date.now()
    // if (form.admit_time) {
    //     let admit_nums = form.admit_time.split(' ')[0].split('-')
    //     // console.log(admit_nums)
    //     let admitday=new Date()
    //     admitday.setFullYear(parseInt(admit_nums[0]), parseInt(admit_nums[1])-1, parseInt(admit_nums[2]))
    //     return_val = return_val || time.getTime() > admitday
    // }
    // if (form.release_time) {
    //     let release_nums = form.release_time.split(' ')[0].split('-')
    //     // console.log(admit_nums)
    //     let releaseday=new Date()
    //     releaseday.setFullYear(parseInt(release_nums[0]), parseInt(release_nums[1])-1, parseInt(release_nums[2]))
    //     return_val = return_val || time.getTime() > releaseday
    // }
    // console.log('disableDate0 finish')
    // return return_val
}
const disabledDate1 = (time)=>{
    let return_val = time.getTime() > Date.now()
    if (form.birthday) {
        let birth_nums = form.birthday.split('-')
        // console.log(birth_nums)
        let birthday=new Date()
        birthday.setFullYear(parseInt(birth_nums[0]), parseInt(birth_nums[1])-1, parseInt(birth_nums[2])-1)
        return_val = return_val || time.getTime() < birthday //birthday?
    }
    if (form.release_time) {
        let release_nums = form.release_time.split(' ')[0].split('-')
        // console.log(admit_nums)
        let releaseday=new Date()
        releaseday.setFullYear(parseInt(release_nums[0]), parseInt(release_nums[1])-1, parseInt(release_nums[2]))
        return_val = return_val || time.getTime() > releaseday
    }
    return return_val
}
const disabledDate2 = (time)=>{
    // let return_val = time.getTime() > Date.now()
    // if (form.birthday) {
    //     let birth_nums = form.birthday.split('-')
    //     // console.log(birth_nums)
    //     let birthday=new Date()
    //     birthday.setFullYear(parseInt(birth_nums[0]), parseInt(birth_nums[1])-1, parseInt(birth_nums[2])-1)
    //     return_val = return_val || time.getTime() < birthday //birthday?
    // }
    // if (form.admit_time) {
    //     let admit_nums = form.admit_time.split(' ')[0].split('-')
    //     // console.log(birth_nums)
    //     let admitday=new Date()
    //     admitday.setFullYear(parseInt(admit_nums[0]), parseInt(admit_nums[1])-1, parseInt(admit_nums[2])-1)
    //     return_val = return_val || time.getTime() < admitday
    // }
    // return return_val
}
const birthOrAdmitdayOnChange = ()=>{
    // if(!form.birthday)
    //     form.birthday = ''
    // if(!form.admit_time)
    //     form.admit_time = ''
    // if(form.birthday!=='' && form.admit_time!=='') {
    //     console.log('入院：'+form.admit_time)
    //     console.log('生日：'+form.birthday)
    //     let birthday = form.birthday
    //     let admitday = form.admit_time.split(' ')[0]
    //     if(birthday===admitday) {
    //         form.age = '第0天'
    //     } else {
    //         console.log(birthday, admitday)
    //         // 计算年龄
    //         let age = new calculateAge(birthday, admitday)
    //         console.log(age.getString())
    //         age = age.getObject()
    //         form.newborn_check = false
    //         if(age.years < 1) {
    //             if(age.days <= 28 && age.months<1) {
    //                 form.newborn_check = true
    //             }
    //             form.age = age.months.toString()+' '+age.days.toString()+'/30月'
    //         } else {
    //             form.age = age.years.toString()
    //         }
    //     }
    // } else {
    //     form.age = '请先输入其他信息'
    // }
    // console.log('age - this.form.age')
}
const admitOrReleasedayOnChange = ()=>{
    // if(!form.admit_time)
    //     form.admit_time = ''
    // if(!form.release_time)
    //     form.release_time = ''
    // if(form.admit_time!=='' && form.release_time!=='') {
    //     console.log('入院：'+form.admit_time)
    //     console.log('出院：'+form.release_time)
    //     let admitday = form.admit_time.split(' ')[0]
    //     let releaseday = form.release_time.split(' ')[0]
    //     console.log(admitday, releaseday)
    //     // 计算住院时间
    //     if(admitday===releaseday) {
    //         form.hosp_duration=1
    //     } else {
    //         let ad = new Date(admitday)
    //         let rd = new Date(releaseday)
    //         let duration = rd.getTime() - ad.getTime()
    //         duration = parseInt(duration/(1000*60*60*24))
    //         console.log(duration)
    //         form.hosp_duration = duration
    //     }                
    // } else {
    //     form.hosp_duration = -1
    // }
}
const nationalityOnChange = val => {
    console.log(val)
    // if(form.nationality!=='中国') {
    //     console.log('this damn ass is not a Chinese')
    //     form.birthplace = ['000000']
    //     form.parent_birthplace = ['000000']
    // }
}
const cancelForm = ()=>{
    router.push('/settle-main')
}
const updateForm = async()=>{
    console.log('updating...')
    const homepage_id = route.params.homepage_id
    const formData = form
    formData['homepage_id'] = homepage_id
    console.log(formData)
    console.log('这里开始')
    // 检验
    if(false) {
    } else {
        // 上传
        await axios
            .post('/api/v1/update-settlement/',{'form':formData})
            .then(response=>{
                console.log('submitted and got response:')
                console.log(response)
            })
            .catch(error=>{
                console.log(error)
            })
        console.log('应该跳转了')
        // this.$router.replace('/success')
        router.push('/settle-main')
    }
}
</script>
<style>
.subtitle {
    margin: 1rem 0;
    background-color: rgb(239, 239, 239);
}
.el-input-number__increase {
    top: .3rem !important;
}
.el-input-number__decrease {
    bottom: .6rem !important;
}
.el-tag {
    margin: 0 2px 0 0;
    border-radius: 0px;
}
.el-tag--default {
    padding: 0 5px;
    height: 18px;
    --el-icon-size: 13px;
}
</style>