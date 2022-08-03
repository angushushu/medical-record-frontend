<template>
    <div id="container">
        <el-row justify="center">
            <div style="max-width: 59rem !important;min-width: 20rem !important">

            
                <div class="title">
                    <h1>病 案 首 页 查 看</h1>
                </div>
                <el-form ref="form" :model="form" :inline="true">
                    <el-row>
                        <el-form-item label="医疗机构" class="w-16 mr-5">
                            <el-input :disabled="this.non_editable" v-model="form.org_name"></el-input>
                        </el-form-item>
                        <el-form-item label="组织机构代码" class="w-16 mr-5">
                            <el-input :disabled="this.non_editable" v-model="form.org_code"></el-input>
                        </el-form-item>
                        <el-form-item label="医疗付费方式" id="purchase-method" class="w-16">
                            <el-select :disabled="this.non_editable" v-model="form.purchase_method" placeholder="请选择" style="width:12rem">
                                <el-option
                                    v-for="method in purchase_methods"
                                    :key="method.value"
                                    :label="method.label"
                                    :value="method.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="健康卡号" class="w-16 mr-5">
                            <el-input :disabled="this.non_editable" v-model="form.health_card"></el-input>
                        </el-form-item>
                        <el-form-item label="第几次入院" id="admit-cnt" class="w-16 mr-5">
                            <el-input-number :disabled="this.non_editable"
                                v-model="form.visits"
                                controls-position="right"
                                :min="0"
                                style="width:100% !important; height: 26px !important"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item label="病案号" class="w-16">
                            <el-input :disabled="this.non_editable" v-model="form.case_num"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="姓名" class="label-emphasize w-11 mr-1">
                            <el-input :disabled="this.non_editable" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" class="label-emphasize w-7 mr-2">
                            <el-select :disabled="this.non_editable" v-model="form.gender" placeholder="请选择">
                                <el-option
                                    v-for="gender in genders"
                                    :key="gender.value"
                                    :label="gender.label"
                                    :value="gender.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="出生日期" class="label-emphasize w-14 mr-2">
                            <el-date-picker :disabled="this.non_editable"
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
                        <el-form-item label="年龄:" class="label-emphasize w-5">
                        </el-form-item>
                        <span class="el-form-item__label w-7 mr-1" style="padding-right:0px !important">{{this.form.age}}</span>
                        <!--默认使用-->
                        <el-form-item label="国籍" class="w-11">
                            <el-select placeholder="请选择国籍" :disabled="this.non_editable" @change="nationalityOnChange" v-model="form.nationality" filterable>
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
                    </el-row>
                    <el-row v-if="this.form.newborn_check" style="height:26px">
                        <!-- 根据年龄决定是否出现 -->
                        <el-form-item label="新生儿出生体重（克）" :max="8000" class="w-16 mr-5">
                            <el-input-number :disabled="this.non_editable" v-model="form.newborn_birth_weight" controls-position="right"></el-input-number>
                        </el-form-item>
                        <el-form-item label="新生儿入院体重（克）" :max="8000" class="w-15">
                            <el-input-number :disabled="this.non_editable" v-model="form.newborn_admit_weight" controls-position="right"></el-input-number>
                        </el-form-item>
                    </el-row>
                    <el-row class="label-emphasize">
                        <el-form-item label="出生地" class="w-16 mr-5">
                            <!-- <elui-china-area-dht :leave="3" @change="birthPlaceOnChange" style="width:100%"></elui-china-area-dht> -->
                            <el-cascader :disabled="this.non_editable"
                                size="large"
                                :options="locations"
                                v-model="form.birthplace"
                                style="width:100%"
                                >
                            </el-cascader>
                            <!-- <p>出生地：{{this.form.birthplace}}</p> -->
                        </el-form-item>
                        <el-form-item label="籍贯" class="w-16 mr-5">
                            <!-- <elui-china-area-dht :leave="3" @change="parentBirthPlaceOnChange" style="width:100%"></elui-china-area-dht> -->
                            <el-cascader :disabled="this.non_editable"
                                size="large"
                                :options="locations"
                                v-model="form.parent_birthplace"
                                style="width:100%"
                                >
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="民族" class="w-16">
                            <el-select :disabled="this.non_editable" v-model="form.ethnicity" placeholder="民族" filterable style="width:100%">
                                <el-option
                                    v-for="eth in ethnicities"
                                    :key="eth.id"
                                    :label="eth.info"
                                    :value="eth.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row class="label-emphasize">
                        <el-form-item label="证件类型" class="w-12 mr-3">
                            <el-select :disabled="this.non_editable" v-model="form.id_type" placeholder="请选择" style="width:100%">
                                <el-option
                                    v-for="type in id_types"
                                    :key="type.value"
                                    :label="type.label"
                                    :value="type.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="证件号" class="w-13 mr-3">
                            <el-input
                            v-model="idNumVal"
                            :disabled="this.non_editable&&this.form.id_type===''"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="职业" class="w-12 mr-3">
                            <el-select :disabled="this.non_editable" v-model="form.profession" placeholder="请选择" style="width:100%">
                                <el-option
                                    v-for="job in professions"
                                    :key="job.value"
                                    :label="job.label"
                                    :value="job.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="婚姻" class="w-12">
                            <el-select :disabled="this.non_editable" v-model="form.marriage_stat" placeholder="请选择" @change="marriageOnChange" style="width:100%">
                                <el-option
                                    v-for="stat in marriage_stats"
                                    :key="stat.value"
                                    :label="stat.label"
                                    :value="stat.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row class="label-emphasize">
                        <el-form-item label="现住址" class="w-15">
                            <!-- <elui-china-area-dht :leave="3" @change="presentAddrOnChange" style="width:100%"></elui-china-area-dht> -->
                            <el-cascader :disabled="this.non_editable"
                                size="large"
                                :options="locations"
                                v-model="form.present_addr1"
                                style="width:100%"
                                @change="presentAddrOnChange"
                                >
                            </el-cascader>
                        </el-form-item>
                        <el-form-item class="w-18 mr-1">
                            <el-input :disabled="this.non_editable" v-model="form.present_addr2"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" class="w-14 mr-1">
                            <el-input :disabled="this.non_editable" v-model="form.present_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮编" class="w-9">
                            <el-input :disabled="this.non_editable" v-model="form.present_zip"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row class="label-emphasize">
                        <el-form-item label="户口住址" class="w-15">
                            <!-- <elui-china-area-dht :leave="3" @change="registeredAddrOnChange" style="width:100%"></elui-china-area-dht> -->
                            <el-cascader :disabled="this.non_editable"
                                size="large"
                                :options="locations"
                                v-model="form.registered_addr1"
                                style="width:100%"
                                >
                            </el-cascader>
                        </el-form-item>
                        <el-form-item class="w-18 mr-16">
                            <el-input :disabled="this.non_editable" v-model="form.registered_addr2"></el-input>
                        </el-form-item>
                        <el-form-item label="邮编" class="w-9">
                            <el-input :disabled="this.non_editable" v-model="form.registered_zip"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row class="label-emphasize">
                        <el-form-item label="工作单位及地址" class="w-15">
                            <!-- <elui-china-area-dht :leave="3" @change="workAddrOnChange" style="width:100%"></elui-china-area-dht> -->
                            <el-cascader :disabled="this.non_editable"
                                size="large"
                                :options="locations"
                                v-model="form.work_addr1"
                                style="width:100%"
                                >
                            </el-cascader>
                        </el-form-item>
                        <el-form-item class="w-18 mr-1">
                            <el-input :disabled="this.non_editable" v-model="form.work_addr2"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" class="w-14 mr-1">
                            <el-input :disabled="this.non_editable" v-model="form.work_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮编" class="w-9">
                            <el-input :disabled="this.non_editable" v-model="form.work_zip"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="联系人姓名" class="label-emphasize w-12 mr-2">
                            <el-input :disabled="this.non_editable" v-model="form.contact_name"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" class="label-emphasize w-10 mr-2">
                            <el-input :disabled="this.non_editable" v-model="form.contact_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="关系" class="label-emphasize w-12 mr-2">
                            <el-select :disabled="this.non_editable" v-model="form.contact_relation" placeholder="请选择">
                                <el-option
                                    v-for="rel in contact_relations"
                                    :key="rel.value"
                                    :label="rel.label"
                                    :value="rel.value"
                                    :disabled="rel.disabled"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 针对其他关系可进行说明 -->
                        <el-form-item v-show="this.form.contact_relation===this.contact_relation_other_value" label="其他关系说明" class="w-18">
                            <el-input :disabled="this.non_editable" v-model="form.contact_other_description"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row class="label-emphasize" style="margin-left:1rem">
                        <el-form-item label="地址" class="w-17">
                            <!-- <elui-china-area-dht :leave="3" @change="contactAddrOnChange" style="width:100%"></elui-china-area-dht> -->
                            <el-cascader :disabled="this.non_editable"
                                size="large"
                                :options="locations"
                                v-model="form.contact_addr1"
                                style="width:100%"
                                >
                            </el-cascader>
                        </el-form-item>
                        <el-form-item class="w-20 mr-1">
                            <el-input :disabled="this.non_editable" v-model="form.contact_addr2"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="入院途径" class="label-emphasize">
                            <el-select :disabled="this.non_editable" v-model="form.admit_path" placeholder="请选择" style="width: 17rem;">
                                <el-option
                                    v-for="path in admit_paths"
                                    :key="path.value"
                                    :label="path.label"
                                    :value="path.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row class="label-emphasize">
                        <el-form-item label="入院时间" class="w-12 mr-2">
                            <el-date-picker :disabled="this.non_editable"
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
                        <el-form-item label="入院科别" class="w-16 mr-2">
                            <el-cascader :disabled="this.non_editable"
                                v-model="form.admit_specialty"
                                :options="specialties"
                            ></el-cascader>
                        </el-form-item>
                        <el-form-item label="病房" class="w-7 mr-2">
                            <el-input :disabled="this.non_editable" v-model="form.admit_sickroom"></el-input>
                        </el-form-item>
                        <el-form-item label="科转科别" class="w-17">
                            <el-cascader :disabled="this.non_editable"
                                v-model="form.trans_specialty"
                                :options="specialties"
                            ></el-cascader>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="出院时间" class="label-emphasize w-12 mr-2">
                            <el-date-picker :disabled="this.non_editable"
                            popper-class="datehr"
                            v-model="form.release_time" 
                            type="datetime" 
                            format="YYYY/MM/DD hh:mm"
                            value-format="YYYY-MM-DD hh:mm"
                            :disabledDate="disabledDate2"
                            @change="admitOrReleasedayOnChange"
                            placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="出院科别" class="label-emphasize w-16 mr-2">
                            <el-cascader :disabled="this.non_editable"
                                v-model="form.release_specialty"
                                :options="specialties"
                            ></el-cascader>
                        </el-form-item>
                        <el-form-item label="病房" class="label-emphasize w-7 mr-2">
                            <el-input :disabled="this.non_editable" v-model="form.release_sickroom"></el-input>
                        </el-form-item>
                        <el-form-item label="实际入院天数:" class="label-emphasize w-6">
                            <!-- <div class="el-form-item__label">{{this.form.age}}</div> -->
                        </el-form-item>
                        <span class="el-form-item__label w-12">{{getHospDuration()}}</span>
                    </el-row>
                    <el-row class="label-emphasize" style="height: auto !important">
                        <!-- <el-form-item label="门（急）诊诊断" style="width:39rem; margin-right:2rem !important; height: auto !important">
                            <el-input :disabled="this.non_editable" v-model="form.diagnosis" :autosize="{ minRows: 1, maxRows: 6 }" type="textarea"></el-input>
                        </el-form-item> -->
                        <el-form-item label="门（急）诊诊断" style="width:39rem; margin-right:2rem !important; height: auto !important">
                            <el-select
                            v-model="form.diagnosis"
                            multiple
                            filterable
                            remote
                            placeholder="添加诊断"
                            :remote-method="queryDiag"
                            :loading="diags_loading"
                            collapse-tags
                            :collapse-tags-tooltip="true"
                            default-first-option
                            class="diag-box"
                            >
                                <el-option
                                v-for="diag in temp_diags"
                                :key="diag.code"
                                :label="diag.label"
                                :value="diag.code"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="疾病编码" style="width:17rem; height:26px !important">
                            <el-input :disabled="this.non_editable" v-model="form.disease_code"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <h5 class="label-emphasize" style="margin: 0.5rem 0 0 0;">主要诊断：</h5>
                    </el-row>
                    <el-form-item style="height: auto !important;">
                        <el-row class="label-emphasize" style="margin-left:1rem">
                            <!-- <el-form-item label="出院诊断" style="width:26rem; margin-right:1rem !important; height: auto !important">
                                <el-input :disabled="this.non_editable" v-model="form.main_diag.release" :autosize="{ minRows: 1, maxRows: 6 }" type="textarea"></el-input>
                            </el-form-item> -->
                            <el-form-item label="出院诊断" style="width:26rem; margin-right:1rem !important; height: auto !important">
                                <el-select
                                v-model="form.main_diag.release"
                                multiple
                                filterable
                                remote
                                placeholder="添加诊断"
                                :remote-method="queryDiag"
                                :loading="diags_loading"
                                collapse-tags
                                :collapse-tags-tooltip="true"
                                default-first-option
                                class="diag-box"
                                >
                                    <el-option
                                    v-for="diag in temp_diags"
                                    :key="diag.code"
                                    :label="diag.label"
                                    :value="diag.code"
                                    />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="疾病编码" class="w-15 mr-1">
                                <el-input :disabled="this.non_editable" v-model="form.main_diag.code"></el-input>
                            </el-form-item>
                            <el-form-item label="入院病情" class="w-14">
                                <!-- <el-input v-model="form.main_diag.condition"></el-input> -->
                                <el-select :disabled="this.non_editable" v-model="form.main_diag.condition" placeholder="请选择">
                                    <el-option
                                        v-for="cond in ad_conditions"
                                        :key="cond.value"
                                        :label="cond.label"
                                        :value="cond.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-row>
                    </el-form-item>
                    <el-row>
                        <h5 class="label-emphasize" style="margin: 0.5rem 0 0 0;">其他诊断：</h5>
                    </el-row>

                    <el-form
                    :model="form.other_diags"
                    ref="form.other_diags"
                    label-with="100px"
                    class="demo-dynami"
                    style="margin-bottom:.5rem;"
                    >
                        <el-form-item
                        v-for="(diag) in form.other_diags"
                        :key="diag.key"
                        style="height: auto !important;"
                        >
                            <el-row class="label-emphasize-light" style="padding-left:1rem; height: auto !important">
                                <!-- <el-form-item label="出院诊断" style="width:26rem; margin-right:1rem !important; height: auto !important; vertical-align:bottom !important">
                                    <el-input :disabled="this.non_editable" v-model="diag.release" :autosize="{ minRows: 1, maxRows: 6 }"  type="textarea"></el-input>
                                </el-form-item> -->
                                <el-form-item label="出院诊断" style="width:26rem; margin-right:1rem !important; height: auto !important">
                                    <el-select
                                    v-model="diag.release"
                                    multiple
                                    filterable
                                    remote
                                    placeholder="添加诊断"
                                    :remote-method="queryDiag"
                                    :loading="diags_loading"
                                    collapse-tags
                                    :collapse-tags-tooltip="true"
                                    default-first-option
                                    class="diag-box"
                                    >
                                        <el-option
                                        v-for="diag in temp_diags"
                                        :key="diag.code"
                                        :label="diag.label"
                                        :value="diag.code"
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="疾病编码" class="w-15 mr-1">
                                    <el-input :disabled="this.non_editable" v-model="diag.code"></el-input>
                                </el-form-item>
                                <el-form-item label="入院病情" class="w-12">
                                    <!-- <el-input v-model="diag.condition"></el-input> -->
                                    <el-select :disabled="this.non_editable" v-model="diag.condition" placeholder="请选择">
                                        <el-option
                                            v-for="cond in ad_conditions"
                                            :key="cond.value"
                                            :label="cond.label"
                                            :value="cond.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-button :disabled="this.non_editable" class="remove-diag" @click.prevent="removeDiag(diag)">-</el-button>
                            </el-row>
                        </el-form-item>
                        <el-row justify="end" style="width:100%">
                            <el-button :disabled="this.non_editable" class="add-diag" style="margin-right:.9rem" @click="addDiag">+ 其他诊断</el-button>
                        </el-row>
                        
                    </el-form>
                    <el-row class="label-emphasize">
                        <el-form-item label="损伤，中毒的外部原因" style="width:43rem; margin-right:1rem !important">
                            <el-input :disabled="this.non_editable" v-model="form.lesion_reason.description"></el-input>
                        </el-form-item>
                        <el-form-item label="疾病编码" class="w-14">
                            <el-input :disabled="this.non_editable" v-model="form.lesion_reason.code"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row class="label-emphasize">
                        <span class="mr-1" style="width:43rem">
                            <!-- <el-form-item label="病理诊断" style="width:100%; height: auto !important; vertical-align:bottom !important">
                                <el-input :disabled="this.non_editable"
                                v-model="form.pathology.description" 
                                :autosize="{ minRows: 1, maxRows: 3 }" 
                                type="textarea"></el-input>
                            </el-form-item> -->
                           <el-form-item label="病理诊断" style="width:100%; height: auto !important; vertical-align:bottom !important">
                                <el-select
                                v-model="form.pathology.description"
                                multiple
                                filterable
                                remote
                                placeholder="添加诊断"
                                :remote-method="queryDiag"
                                :loading="diags_loading"
                                collapse-tags
                                :collapse-tags-tooltip="true"
                                default-first-option
                                class="diag-box"
                                >
                                    <el-option
                                    v-for="diag in temp_diags"
                                    :key="diag.code"
                                    :label="diag.label"
                                    :value="diag.code"
                                    />
                                </el-select>
                            </el-form-item>
                        </span>
                        <span>
                            <el-row>
                                <el-form-item label="疾病编码" class="w-14">
                                    <el-input :disabled="this.non_editable" v-model="form.pathology.code"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="病理号" class="w-14">
                                    <el-input :disabled="this.non_editable" v-model="form.pathology.number"></el-input>
                                </el-form-item>
                            </el-row>
                        </span>
                    </el-row>
                    <el-row class="label-emphasize">
                        <span>
                            <el-form-item label="药物过敏" class="mr-2">
                                <el-checkbox :disabled="this.non_editable" v-model="form.drug_allergy_check" true-label=true false-label=false ></el-checkbox>
                                <span>
                                    <el-input :disabled="this.non_editable" v-if="form.drug_allergy_check=='true'" style="margin-left:.5rem !important; width: 15rem" v-model="form.drug_allergy" placeholder="过敏药物"></el-input>
                                </span>
                            </el-form-item>
                        </span>
                        <span>
                            <el-form-item label="死亡患者尸检" class="mr-2">
                                <el-checkbox :disabled="this.non_editable" v-model="form.necropsy_check" true-label=true false-label=false ></el-checkbox>
                            </el-form-item>
                        </span>
                        <span>
                            <el-form-item label="血型" class="w-13 mr-2">
                                <el-select :disabled="this.non_editable" v-model="form.blood_group" placeholder="请选择">
                                    <el-option
                                        v-for="group in blood_groups"
                                        :key="group.value"
                                        :label="group.label"
                                        :value="group.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </span>
                        <span>
                            <el-form-item label="Rh" class="w-13">
                                <el-select :disabled="this.non_editable" v-model="form.rh" placeholder="请选择">
                                    <el-option
                                        v-for="rh in rhs"
                                        :key="rh.value"
                                        :label="rh.label"
                                        :value="rh.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </span>
                    </el-row>
                    <el-row class="label-emphasize">
                        <el-form-item label="科主任" class="w-13 mr-1">
                            <el-input :disabled="this.non_editable" v-model="form.director"></el-input>
                        </el-form-item>
                        <el-form-item label="主任（副主任）医师" class="w-16 mr-1">
                            <el-input :disabled="this.non_editable" v-model="form.chief"></el-input>
                        </el-form-item>
                        <el-form-item label="主治医师" class="w-13 mr-1">
                            <el-input :disabled="this.non_editable" v-model="form.physician_ic"></el-input>
                        </el-form-item>
                        <el-form-item label="住院医师" class="w-13">
                            <el-input :disabled="this.non_editable" v-model="form.resident"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row class="label-emphasize">
                        <el-form-item label="责任护士" class="w-13 mr-1">
                            <el-input :disabled="this.non_editable" v-model="form.nurse_ic"></el-input>
                        </el-form-item>
                        <el-form-item label="进修医师" class="w-16 mr-1">
                            <el-input :disabled="this.non_editable" v-model="form.refresher"></el-input>
                        </el-form-item>
                        <el-form-item label="实习医师" class="w-13 mr-1">
                            <el-input :disabled="this.non_editable" v-model="form.trainee"></el-input>
                        </el-form-item>
                        <el-form-item label="编码员" class="w-13">
                            <el-input :disabled="this.non_editable" v-model="form.coder"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="病案质量" class="label-emphasize w-13 mr-1">
                            <el-select :disabled="this.non_editable" v-model="form.record_quality" placeholder="请选择">
                                <el-option
                                    v-for="rq in record_qualities"
                                    :key="rq.value"
                                    :label="rq.label"
                                    :value="rq.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>      
                        <el-form-item label="质控医师" class="label-emphasize w-16 mr-1">
                            <el-input :disabled="this.non_editable" v-model="form.qc_doctor"></el-input>
                        </el-form-item>
                        <el-form-item label="质控护士" class="label-emphasize w-13 mr-1">
                            <el-input :disabled="this.non_editable" v-model="form.qc_nurse"></el-input>
                        </el-form-item>
                        <el-form-item label="质控日期" class="w-13">
                            <el-date-picker :disabled="this.non_editable"
                            v-model="form.qc_date" 
                            type="date" 
                            format="YYYY/MM/DD"
                            value-format="YYYY-MM-DD"
                            placeholder="选择">
                            </el-date-picker>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <h5 class="label-emphasize" style="margin: 0.5rem 0 0 0;">手术：</h5>
                    </el-row>

                    <el-form
                    :model="form.ops"
                    ref="form.ops"
                    label-with="100px"
                    class="demo-dynamic label-emphasize-light"
                    >
                        <el-form-item
                        v-for="(op) in form.ops"
                        :key="op.key"
                        style="height: auto !important;"
                        >
                            <el-row class="operations" style="padding-left:1rem !important; margin:.2rem 0 .5rem 0; width:100%">
                                <el-col :span="23.8">
                                    <el-row style="margin-right:1rem">
                                        <el-form-item label="手术及操作编码" class="w-13 mr-1">
                                            <el-input :disabled="this.non_editable" v-model="op.code"></el-input>
                                        </el-form-item>
                                        <el-form-item label="手术及操作日期" class="w-13 mr-1">
                                            <el-date-picker :disabled="this.non_editable"
                                            v-model="op.date" 
                                            type="date" 
                                            format="YYYY/MM/DD"
                                            value-format="YYYY-MM-DD"
                                            placeholder="选择">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="手术级别" class="w-9 mr-1">
                                            <el-select :disabled="this.non_editable" v-model="op.level" placeholder="请选择">
                                                <el-option
                                                    v-for="lvl in op_lvls"
                                                    :key="lvl.value"
                                                    :label="lvl.label"
                                                    :value="lvl.value"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="手术及操作名称" class="w-16">
                                            <el-input :disabled="this.non_editable" v-model="op.name"></el-input>
                                        </el-form-item>
                                    </el-row>
                                    <el-row>
                                        <el-form>
                                            <el-form-item label="手术及操作医师:术者" class="w-18 mr-2">
                                                <el-input :disabled="this.non_editable" v-model="op.operator"></el-input>
                                            </el-form-item>
                                            <el-form-item label="I助" class="w-16 mr-2">
                                                <el-input :disabled="this.non_editable" v-model="op.assis1"></el-input>
                                            </el-form-item>
                                            <el-form-item label="II助" class="w-16">
                                                <el-input :disabled="this.non_editable" v-model="op.assis2"></el-input>
                                            </el-form-item>
                                        </el-form>
                                    </el-row>
                                    <el-row>
                                        <el-form-item label="切口愈合等级" class="w-18 mr-2">
                                            <el-cascader :disabled="this.non_editable"
                                                v-model="op.wound_healing_lvl"
                                                :options="wh_lvls"
                                            ></el-cascader>
                                        </el-form-item>
                                        <el-form-item label="麻醉方式" class="w-16 mr-2">
                                            <el-select :disabled="this.non_editable" v-model="op.anaesthesia_type" placeholder="请选择">
                                                <el-option
                                                    v-for="type in anaesthesia_types"
                                                    :key="type.value"
                                                    :label="type.label"
                                                    :value="type.value"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="麻醉医师" class="w-16">
                                            <el-input :disabled="this.non_editable" v-model="op.anaesthetist"></el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-col>
                                <el-col :span="0.2">
                                    <el-button :disabled="this.non_editable" class="remove-op" @click.prevent="removeOp(op)">-</el-button>
                                </el-col>
                            </el-row>                            
                        </el-form-item>
                        <el-row justify="end" style="width:100%">
                            <el-button :disabled="this.non_editable" class="add-op" style="margin-right:.9rem" @click="addOp">+ 手术</el-button>
                        </el-row>
                    </el-form>
                    <el-row>
                        <el-form-item label="离院方式" class="label-emphasize">
                            <el-select :disabled="this.non_editable" v-model="form.release_type" placeholder="请选择">
                                <el-option
                                    v-for="type in release_types"
                                    :key="type.value"
                                    :label="type.label"
                                    :value="type.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <span>
                            <el-form-item v-if="form.release_type===release_type_trans_2" label="拟接收医疗机构名称">
                                <el-input :disabled="this.non_editable" v-model="form.accept_hosp_2"></el-input>
                            </el-form-item>
                        </span>
                        <span>
                            <el-form-item v-if="form.release_type===release_type_trans_3" label="拟接收医疗机构名称">
                                <el-input :disabled="this.non_editable" v-model="form.accept_hosp_3"></el-input>
                            </el-form-item>
                        </span>

                        <!-- 需根据选项添加内容 -->
                    </el-row>
                    <el-row>
                        <el-form-item label="有出院31天内再住院计划">
                            <el-checkbox :disabled="this.non_editable" class="mr-1" v-model="form.cont_hosp_check" true-label=true false-label=false ></el-checkbox>
                            <span>
                                <el-input :disabled="this.non_editable" v-show="form.cont_hosp_check=='true'" v-model="form.cont_hosp_plan" placeholder="目的"></el-input>
                            </span>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="颅脑损伤患者昏迷时间" class="mr-1">
                            <el-checkbox :disabled="this.non_editable" v-model="form.head_injury_check" true-label=true false-label=false ></el-checkbox>
                        </el-form-item>
                        <!-- <span> -->
                        <el-form-item v-show="form.head_injury_check=='true'">
                            <span>
                                <label class="el-form-item__label" style="line-height:28px !important">
                                    入院前
                                </label>
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.pre_admit_coma.days"
                                    :controls="false"
                                    :min="0"
                                    style="width:3rem"
                                ></el-input-number>
                                <label class="el-form-item__label" style="line-height:28px !important">
                                    天
                                </label>
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.pre_admit_coma.hrs"
                                    :controls="false"
                                    :min="0"
                                    style="width:3rem"
                                ></el-input-number>
                                <label class="el-form-item__label" style="line-height:28px !important">
                                    小时
                                </label>
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.pre_admit_coma.mins"
                                    :controls="false"
                                    :min="0"
                                    style="width:3rem"
                                ></el-input-number>
                                <label class="el-form-item__label" style="line-height:28px !important">
                                    分钟
                                </label>
                            </span>
                            <span style="margin-left:1rem">
                                <label class="el-form-item__label" style="line-height:28px !important">
                                    入院后
                                </label>
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.post_admit_coma.days"
                                    :controls="false"
                                    :min="0"
                                    style="width:3rem"
                                ></el-input-number>
                                <label class="el-form-item__label" style="line-height:28px !important">
                                    天
                                </label>
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.post_admit_coma.hrs"
                                    :controls="false"
                                    :min="0"
                                    style="width:3rem"
                                ></el-input-number>
                                <label class="el-form-item__label" style="line-height:28px !important">
                                    小时
                                </label>
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.post_admit_coma.mins"
                                    :precision="0"
                                    :controls="false"
                                    :min="0"
                                    style="width:3rem"
                                ></el-input-number>
                                <label class="el-form-item__label" style="line-height:28px !important">
                                    分钟
                                </label>
                            </span>

                        </el-form-item>
                        <!-- </span> -->
                    </el-row>

                    <el-form>
                        <el-row>
                            <el-form-item label="住院费用（元）：  &nbsp&nbsp&nbsp总费用" class="label-emphasize" style="width:19.8rem">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.total"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                    style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                            <label class="el-form-item__label" style="padding-right:0px !important">
                                （
                            </label>
                            <el-form-item label="自付金额">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.self_pay"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                            <label class="el-form-item__label" style="padding-right:0px !important">
                                ）
                            </label>
                        </el-row>
                        <el-row>
                            <el-form-item label="1.综合医疗服务类：" class="label-emphasize"></el-form-item>
                            <el-form-item label="一般医疗服务费" class="w-12 mr-1">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.general_service"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="一般治疗操作费" class="w-12 mr-1">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.general_operation"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="护理费" class="w-11 mr-1">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.general_nursing"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="其他费用" class="w-12">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.general_other"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="2.诊断类：" class="label-emphasize"></el-form-item>
                            <el-form-item label="病理诊断费" class="w-13 mr-1">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.pathologic_diag"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="实验室诊断费" class="w-13 mr-1">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.lab_diag"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="影像学诊断费" class="w-12 mr-1">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.scan_diag"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="临床诊断项目费" style="width:12.5rem !important">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.clinic_diag"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="3.治疗类：" class="label-emphasize"></el-form-item>
                            <el-form-item label="非手术治疗项目费" style="width:12rem">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.non_operational"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                            <label class="el-form-item__label" style="padding-right:0px !important">
                                （
                            </label>
                            <el-form-item label="临床物理治疗费" style="width:12rem">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.clinic_physic"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                            <label class="el-form-item__label" style="padding-right:0px !important; margin-right:.5rem">
                                ）
                            </label>
                            <el-form-item label="手术治疗费" style="width:10rem">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.operational"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                            <label class="el-form-item__label" style="padding-right:0px !important">
                                （
                            </label>
                            <el-form-item label="麻醉费" style="width:8rem">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.anaesthesia"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="手术费" style="width:8rem">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.operation"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                            <label class="el-form-item__label" style="padding-right:0px !important">
                                ）
                            </label>
                        </el-row>
                        <el-row>
                            <el-form-item label="4.康复类：" class="label-emphasize"></el-form-item>
                            <el-form-item label="康复费" class="w-14">
                            <el-input-number :disabled="this.non_editable"
                                v-model="form.charge.recover"
                                :precision="2"
                                :controls="false"
                                :min="0"
                                style="width:100%"
                            ></el-input-number>
                        </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="5.中医类：" class="label-emphasize"></el-form-item>
                            <el-form-item label="中医治疗费" class="w-14">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.traditional_treat"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                    style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="6.西药类：" class="label-emphasize"></el-form-item>
                            <el-form-item label="西药费" class="w-14">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.western_med"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                    style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                            <label class="el-form-item__label" style="padding-right:0px !important">
                                （
                            </label>
                            <el-form-item label="抗菌药物费用">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.antibio_med"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                            <label class="el-form-item__label" style="padding-right:0px !important">
                                ）
                            </label>
                        </el-row>
                        <el-row>
                            <el-form-item label="7.中药类：" class="label-emphasize"></el-form-item>
                            <el-form-item label="中成药费" class="w-14 mr-1">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.traditional_patent_drug"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                    style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="中草药费">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.traditional_herb"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="8.血液和血液制品类：" class="label-emphasize"></el-form-item>
                            <el-form-item label="血费" class="w-7 mr-1">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.blood"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                    style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="蛋白质类制品费" class="w-13 mr-1">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.proteins"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                    style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="球蛋白类制品费" class="w-13 mr-1">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.globulins"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                    style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="凝血因子类制品费" class="w-13">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.coagulation"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="细胞因子类制品费" style="margin-left:1rem !important" class="w-15">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.cytokine"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                    style="width:100%"
                                ></el-input-number>
                            </el-form-item> 
                        </el-row>
                        <el-row>
                            <el-form-item label="9.耗材类：" class="label-emphasize"></el-form-item>
                            <el-form-item label="检查用一次性医用材料费" class="w-18 mr-1">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.examine_supplies"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                    style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="治疗用一次性医用材料费" class="w-17 mr-1">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.treat_supplies"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                    style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item label="手术用一次性医用材料费" style="width:16.5rem !important">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.operation_supplies"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                    style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="10.其他类：" class="label-emphasize"></el-form-item>
                            <el-form-item label="其他费" style="width:11.2rem !important">
                                <el-input-number :disabled="this.non_editable"
                                    v-model="form.charge.other"
                                    :precision="2"
                                    :controls="false"
                                    :min="0"
                                    style="width:100%"
                                ></el-input-number>
                            </el-form-item>
                        </el-row>
                    </el-form>
                    <el-row style="margin-bottom:5rem">
                        <el-col :span="12" justify="start">
                            <el-switch
                            style="margin: 1rem 1rem 5rem 0px;"
                            v-model="non_editable"
                            active-color="#008585"
                            inactive-color="#c92d2d"
                            :active-value=false
                            :inactive-value=true
                            inline-prompt
                            active-text="锁定"
                            inactive-text="编辑"
                            :width = "70"
                            />
                        </el-col>
                        <el-col :span="12">
                            <el-form-item style="float:right !important">
                                <el-button 
                                class="cancel"
                                @click="cancelForm"
                                style="margin:1rem 1rem 5rem 0;"
                                >取消操作</el-button>
                            </el-form-item>
                            <el-form-item style="float:right !important">
                                <el-button 
                                :disabled="this.non_editable"
                                @click="updateForm"
                                style="margin:1rem 1rem 5rem 0;"
                                >更新首页</el-button>
                            </el-form-item>
                        </el-col>
                        <!-- <el-icon>
                            <edit />
                        </el-icon>
                        <el-icon style="background-color:#ddd !important;">
                            <view />
                        </el-icon> -->

                        <!-- :active-icon="<view></view>"
                        :inactive-icon="<edit></edit>" -->
                        
                        
                    </el-row>
                </el-form>
            </div>
        </el-row>
    </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
import { validate, province, birthDate, gender, pattern } from 'chinese-idcard-checker'
import { ElMessageBox, ElMessage } from 'element-plus'

import calculateAge from 'calculate-age'
import axios from 'axios'

import { Edit, View } from '@element-plus/icons-vue'

export default {
    name: 'homepage',
    components: {
        View,
        Edit,
    },
    data() {
        // 添加其他选项
        const getChinaData = ()=>{
            if(regionData[regionData.length-1].label != '其他') {
                regionData.push({value: '000000', label: '其他'})
            }
            return regionData
        }
        return {
            non_editable: true,
            edit_class: 'edit',

            //诊断
            diag_list: [],
            temp_diags: [],
            diags_loading: false,

            contact_relation_other_value: '',
            contact_relation_partner_index: -1,
            id_type_id_card: '',
            id_type_passport: '',
            id_type_officer: '',
            marriage_stat_married: '',
            release_type_trans_2: '',
            release_type_trans_3: '',

            form: {
                org_name: '',
                org_code: '',
                purchase_method: '',
                health_card: '',
                admit_cnt: 0,
                case_num: '',
                name: '',
                gender: '',
                birthday: '',
                age: '请先输入其他信息',
                nationality: '',
                newborn_check: false,
                newborn_birth_weight: 0,
                newborn_admit_weight: 0,
                birthplace: [],
                parent_birthplace: [],
                ethnicity: '',
                id_type: '',
                id_num: '',

                id_card_num: '',
                passport_num: '',
                officer_num: '',

                profession: '',
                marriage_stat: '',
                present_addr1: [],
                present_addr2: '',
                present_phone: '',
                present_zip: '',
                registered_addr1: [],
                registered_addr2: '',
                registered_zip: '',
                work_addr1: [],
                work_addr2: '',
                work_phone: '',
                work_zip: '',
                contact_name: '',
                contact_relation: '',
                contact_other_description: '',
                contact_addr1: [],
                contact_addr2: '',
                contact_phone: '',
                admit_path: '',
                admit_time: '',
                admit_specialty: [],
                admit_sickroom: '',
                trans_specialty: [],
                release_time: '',
                release_specialty: [],
                release_sickroom: '',
                hosp_duration: -1,
                diagnosis: [],
                disease_code: '',
                main_diag: {
                    release: [],
                    code: '',
                    condition: ''
                },
                other_diags: [
                    {
                        release: [],
                        code: '',
                        condition: ''
                    },
                ],
                // for each other_diag
                od_release: '',
                od_code: '',
                od_condition: '',
                lesion_reason: {
                    description: '',
                    code: '',
                },
                pathology: {
                    description: '',
                    code: '',
                    number: '',
                },
                drug_allergy_check: false,
                drug_allergy: '',
                necropsy_check: false,
                blood_group: '',
                rh: '',
                director: '',
                chief: '',
                physician_ic: '',
                resident: '',
                nurse_ic: '',
                refresher: '',
                trainee: '',
                coder: '',
                record_quality: '',
                qc_doctor: '',
                qc_nurse: '',
                qc_date: '',
                ops: [
                    {
                        code: '',
                        date: '',
                        level: '',
                        name: '',
                        operator: '',
                        assis1: '',
                        assis2: '',
                        wound_healing_lvl: [],
                        anaesthesia_type: '',
                        anaesthetist: '',
                    }
                ],
                release_type: '',
                accept_hosp_2: '',
                accept_hosp_3: '',
                cont_hosp_check: false,
                cont_hosp_plan: '',
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
                charge: {
                    total: 0,
                    self_pay: 0,
                    general_service: 0,
                    general_operation: 0,
                    general_nursing: 0,
                    general_other: 0,
                    pathologic_diag: 0,
                    lab_diag: 0,
                    scan_diag: 0,
                    clinic_diag: 0,
                    non_operational: 0,
                    operational: 0,
                    clinic_physic: 0,
                    anaesthesia: 0,
                    operation: 0,
                    recover: 0,
                    traditional_treat: 0,
                    western_med: 0,
                    antibio_med: 0,
                    traditional_patent_drug: 0,
                    traditional_herb: 0,
                    blood: 0,
                    proteins: 0,
                    globulins: 0,
                    coagulation: 0,
                    cytokine: 0,
                    examine_supplies: 0,
                    treat_supplies: 0,
                    operation_supplies: 0,
                    other: 0
                }
            },
            purchase_methods: [
                // {
                //     value: '1',
                //     label: '城镇职工基本医疗保险'
                // },
                // {
                //     value: '2',
                //     label: '城镇居民基本医疗保险'
                // },
                // {
                //     value: '3',
                //     label: '新型农村合作医疗'
                // },
                // {
                //     value: '4',
                //     label: '贫困救助'
                // },
                // {
                //     value: '5',
                //     label: '商业医疗保险'
                // },
                // {
                //     value: '6',
                //     label: '全公费'
                // },
                // {
                //     value: '7',
                //     label: '全自费'
                // },
                // {
                //     value: '8',
                //     label: '其他社会保险'
                // },
                // {
                //     value: '9',
                //     label: '其他'
                // },
            ],
            genders: [
                // {
                //     value: '1',
                //     label: '男'
                // },
                // {
                //     value: '2',
                //     label: '女'
                // }
            ],
            countries:[{
    			label: '热门国家',
    			options: [{value:'China',label:'中国'},]
    		},{
    			label: '所有国家',
    			options: [
    			    {value:'Angola',label:'安哥拉'},
					// {value:'Afghanistan',label:'阿富汗'},
					// {value:'Albania',label:'阿尔巴尼亚'},
					// {value:'Algeria',label:'阿尔及利亚'},
					// {value:'Andorra',label:'安道尔共和国'},
					// {value:'Anguilla',label:'安圭拉岛'},
					// {value:'Antigua and Barbuda',label:'安提瓜和巴布达'},
					// {value:'Argentina',label:'阿根廷'},
					// {value:'Armenia',label:'亚美尼亚'},
					// {value:'Ascension',label:'阿森松'},
					// {value:'Australia',label:'澳大利亚'},
					// {value:'Austria',label:'奥地利'},
					// {value:'Azerbaijan',label:'阿塞拜疆'},
					// {value:'Bahamas',label:'巴哈马'},
					// {value:'Bahrain',label:'巴林'},
					// {value:'Bangladesh',label:'孟加拉国'},
					// {value:'Barbados',label:'巴巴多斯'},
					// {value:'Belarus',label:'白俄罗斯'},
					// {value:'Belgium',label:'比利时'},
					// {value:'Belize',label:'伯利兹'},
					// {value:'Benin',label:'贝宁'},
					// {value:'Bermuda Is',label:'百慕大群岛'},
					// {value:'Bolivia',label:'玻利维亚'},
					// {value:'Botswana',label:'博茨瓦纳'},
					// {value:'Brazil',label:'巴西'},
					// {value:'Brunei',label:'文莱'},
					// {value:'Bulgaria',label:'保加利亚'},
					// {value:'Burkina Faso',label:'布基纳法索'},
					// {value:'Burma',label:'缅甸'},
					// {value:'Burundi',label:'布隆迪'},
					// {value:'Cameroon',label:'喀麦隆'},
					// {value:'Canada',label:'加拿大'},
					// {value:'Cayman Is',label:'开曼群岛'},
					// {value:'Central African Republic',label:'中非共和国'},
					// {value:'Chad',label:'乍得'},
					// {value:'Chile',label:'智利'},
					// {value:'China',label:'中国'},
					// {value:'Colombia',label:'哥伦比亚'},
					// {value:'Congo',label:'刚果'},
					// {value:'Cook Is',label:'库克群岛'},
					// {value:'Costa Rica',label:'哥斯达黎加'},
					// {value:'Cuba',label:'古巴'},
					// {value:'Cyprus',label:'塞浦路斯'},
					// {value:'Czech Republic',label:'捷克'},
					// {value:'Denmark',label:'丹麦'},
					// {value:'Djibouti',label:'吉布提'},
					// {value:'Dominica Rep',label:'多米尼加共和国'},
					// {value:'Ecuador',label:'厄瓜多尔'},
					// {value:'Egypt',label:'埃及'},
					// {value:'EI Salvador',label:'萨尔瓦多'},
					// {value:'Estonia',label:'爱沙尼亚'},
					// {value:'Ethiopia',label:'埃塞俄比亚'},
					// {value:'Fiji',label:'斐济'},
					// {value:'Finland',label:'芬兰'},
					// {value:'France',label:'法国'},
					// {value:'French Guiana',label:'法属圭亚那'},
					// {value:'French Polynesia',label:'法属玻利尼西亚'},
					// {value:'Gabon',label:'加蓬'},
					// {value:'Gambia',label:'冈比亚'},
					// {value:'Georgia',label:'格鲁吉亚'},
					// {value:'Germany',label:'德国'},
					// {value:'Ghana',label:'加纳'},
					// {value:'Gibraltar',label:'直布罗陀'},
					// {value:'Greece',label:'希腊'},
					// {value:'Grenada',label:'格林纳达'},
					// {value:'Guam',label:'关岛'},
					// {value:'Guatemala',label:'危地马拉'},
					// {value:'Guinea',label:'几内亚'},
					// {value:'Guyana',label:'圭亚那'},
					// {value:'Haiti',label:'海地'},
					// {value:'Honduras',label:'洪都拉斯'},
					// {value:'Hungary',label:'匈牙利'},
					// {value:'Iceland',label:'冰岛'},
					// {value:'India',label:'印度'},
					// {value:'Indonesia',label:'印度尼西亚'},
					// {value:'Iran',label:'伊朗'},
					// {value:'Iraq',label:'伊拉克'},
					// {value:'Ireland',label:'爱尔兰'},
					// {value:'Israel',label:'以色列'},
					// {value:'Italy',label:'意大利'},
					// {value:'Ivory Coast',label:'科特迪瓦'},
					// {value:'Jamaica',label:'牙买加'},
					// {value:'Japan',label:'日本'},
					// {value:'Jordan',label:'约旦'},
					// {value:'Kampuchea (Cambodia )',label:'柬埔寨'},
					// {value:'Kazakstan',label:'哈萨克斯坦'},
					// {value:'Kenya',label:'肯尼亚'},
					// {value:'Korea',label:'韩国'},
					// {value:'Kuwait',label:'科威特'},
					// {value:'Kyrgyzstan',label:'吉尔吉斯坦'},
					// {value:'Laos',label:'老挝'},
					// {value:'Latvia',label:'拉脱维亚'},
					// {value:'Lebanon',label:'黎巴嫩'},
					// {value:'Lesotho',label:'莱索托'},
					// {value:'Liberia',label:'利比里亚'},
					// {value:'Libya',label:'利比亚'},
					// {value:'Liechtenstein',label:'列支敦士登'},
					// {value:'Lithuania',label:'立陶宛'},
					// {value:'Luxembourg',label:'卢森堡'},
					// {value:'Madagascar',label:'马达加斯加'},
					// {value:'Malawi',label:'马拉维'},
					// {value:'Malaysia',label:'马来西亚'},
					// {value:'Maldives',label:'马尔代夫'},
					// {value:'Mali',label:'马里'},
					// {value:'Malta',label:'马耳他'},
					// {value:'Mariana Is',label:'马里亚那群岛'},
					// {value:'Martinique',label:'马提尼克'},
					// {value:'Mauritius',label:'毛里求斯'},
					// {value:'Mexico',label:'墨西哥'},
					// {value:'Moldova',label:'摩尔多瓦'},
					// {value:'Monaco',label:'摩纳哥'},
					// {value:'Mongolia',label:'蒙古'},
					// {value:'Montserrat Is',label:'蒙特塞拉特岛'},
					// {value:'Morocco',label:'摩洛哥'},
					// {value:'Mozambique',label:'莫桑比克'},
					// {value:'Namibia',label:'纳米比亚'},
					// {value:'Nauru',label:'瑙鲁'},
					// {value:'Nepal',label:'尼泊尔'},
					// {value:'Netheriands Antilles',label:'荷属安的列斯'},
					// {value:'Netherlands',label:'荷兰'},
					// {value:'New Zealand',label:'新西兰'},
					// {value:'Nicaragua',label:'尼加拉瓜'},
					// {value:'Niger',label:'尼日尔'},
					// {value:'Nigeria',label:'尼日利亚'},
					// {value:'North Korea',label:'朝鲜'},
					// {value:'Norway',label:'挪威'},
					// {value:'Oman',label:'阿曼'},
					// {value:'Pakistan',label:'巴基斯坦'},
					// {value:'Panama',label:'巴拿马'},
					// {value:'Papua New Cuinea',label:'巴布亚新几内亚'},
					// {value:'Paraguay',label:'巴拉圭'},
					// {value:'Peru',label:'秘鲁'},
					// {value:'Philippines',label:'菲律宾'},
					// {value:'Poland',label:'波兰'},
					// {value:'Portugal',label:'葡萄牙'},
					// {value:'Puerto Rico',label:'波多黎各'},
					// {value:'Qatar',label:'卡塔尔'},
					// {value:'Reunion',label:'留尼旺'},
					// {value:'Romania',label:'罗马尼亚'},
					// {value:'Russia',label:'俄罗斯'},
					// {value:'Saint Lueia',label:'圣卢西亚'},
					// {value:'Saint Vincent',label:'圣文森特岛'},
					// {value:'Samoa Eastern',label:'东萨摩亚(美)'},
					// {value:'Samoa Western',label:'西萨摩亚'},
					// {value:'San Marino',label:'圣马力诺'},
					// {value:'Sao Tome and Principe',label:'圣多美和普林西比'},
					// {value:'Saudi Arabia',label:'沙特阿拉伯'},
					// {value:'Senegal',label:'塞内加尔'},
					// {value:'Seychelles',label:'塞舌尔'},
					// {value:'Sierra Leone',label:'塞拉利昂'},
					// {value:'Singapore',label:'新加坡'},
					// {value:'Slovakia',label:'斯洛伐克'},
					// {value:'Slovenia',label:'斯洛文尼亚'},
					// {value:'Solomon Is',label:'所罗门群岛'},
					// {value:'Somali',label:'索马里'},
					// {value:'South Africa',label:'南非'},
					// {value:'Spain',label:'西班牙'},
					// {value:'SriLanka',label:'斯里兰卡'},
					// {value:'St.Lucia',label:'圣卢西亚'},
					// {value:'St.Vincent',label:'圣文森特'},
					// {value:'Sudan',label:'苏丹'},
					// {value:'Suriname',label:'苏里南'},
					// {value:'Swaziland',label:'斯威士兰'},
					// {value:'Sweden',label:'瑞典'},
					// {value:'Switzerland',label:'瑞士'},
					// {value:'Syria',label:'叙利亚'},
					// {value:'Tajikstan',label:'塔吉克斯坦'},
					// {value:'Tanzania',label:'坦桑尼亚'},
					// {value:'Thailand',label:'泰国'},
					// {value:'Togo',label:'多哥'},
					// {value:'Tonga',label:'汤加'},
					// {value:'Trinidad and Tobago',label:'特立尼达和多巴哥'},
					// {value:'Tunisia',label:'突尼斯'},
					// {value:'Turkey',label:'土耳其'},
					// {value:'Turkmenistan',label:'土库曼斯坦'},
					// {value:'Uganda',label:'乌干达'},
					// {value:'Ukraine',label:'乌克兰'},
					// {value:'United Arab Emirates',label:'阿拉伯联合酋长国'},
					// {value:'United Kiongdom',label:'英国'},
					// {value:'United States of America',label:'美国'},
					// {value:'Uruguay',label:'乌拉圭'},
					// {value:'Uzbekistan',label:'乌兹别克斯坦'},
					// {value:'Venezuela',label:'委内瑞拉'},
					// {value:'Vietnam',label:'越南'},
					// {value:'Yemen',label:'也门'},
					// {value:'Yugoslavia',label:'南斯拉夫'},
					// {value:'Zimbabwe',label:'津巴布韦'},
					// {value:'Zaire',label:'扎伊尔'},
					// {value:'Zambia',label:'赞比亚'}
    			]
    		}],
            locations: getChinaData(),
            ethnicities:[
                // {
                // id: 1,
                // info: "汉族",
                // },
                // {
                // id: 2,
                // info: "壮族",
                // },
                // {
                // id: 3,
                // info: "满族",
                // },
                // {
                // id: 4,
                // info: "回族",
                // value: 4,
                // },
                // {
                // id: 5,
                // info: "苗族",
                // },
                // {
                // id: 6,
                // info: "维吾尔族",
                // },
                // {
                // id: 7,
                // info: "土家族",
                // },
                // {
                // id: 8,
                // info: "彝族",
                // },
                // {
                // id: 9,
                // info: "蒙古族",
                // },
                // {
                // id: 10,
                // info: "藏族",
                // },
                // {
                // id: 11,
                // info: "布依族",
                // },
                // {
                // id: 12,
                // info: "侗族",
                // },
                // {
                // id: 13,
                // info: "瑶族",
                // },
                // {
                // id: 14,
                // info: "朝鲜族",
                // },
                // {
                // id: 15,
                // info: "白族",
                // },
                // {
                // id: 16,
                // info: "哈尼族",
                // },
                // {
                // id: 17,
                // info: "哈萨克族",
                // },
                // {
                // id: 18,
                // info: "黎族",
                // },
                // {
                // id: 19,
                // info: "傣族",
                // },
                // {
                // id: 20,
                // info: "畲族",
                // },
                // {
                // id: 21,
                // info: "傈僳族",
                // },
                // {
                // id: 22,
                // info: "仡佬族",
                // },
                // {
                // id: 23,
                // info: "东乡族",
                // },
                // {
                // id: 24,
                // info: "高山族",
                // },
                // {
                // id: 25,
                // info: "拉祜族",
                // },
                // {
                // id: 26,
                // info: "水族",
                // },
                // {
                // id: 27,
                // info: "佤族",
                // },
                // {
                // id: 28,
                // info: "纳西族",
                // },
                // {
                // id: 29,
                // info: "羌族",
                // },
                // {
                // id: 30,
                // info: "土族",
                // },
                // {
                // id: 31,
                // info: "仫佬族",
                // },
                // {
                // id: 32,
                // info: "锡伯族",
                // },
                // {
                // id: 33,
                // info: "柯尔克孜族",
                // },
                // {
                // id: 34,
                // info: "达斡尔族",
                // },
                // {
                // id: 35,
                // info: "景颇族",
                // },
                // {
                // id: 36,
                // info: "毛南族",
                // },
                // {
                // id: 37,
                // info: "撒拉族",
                // },
                // {
                // id: 38,
                // info: "布朗族",
                // },
                // {
                // id: 39,
                // info: "塔吉克族",
                // },
                // {
                // id: 40,
                // info: "阿昌族",
                // },
                // {
                // id: 41,
                // info: "普米族",
                // },
                // {
                // id: 42,
                // info: "鄂温克族",
                // },
                // {
                // id: 43,
                // info: "怒族",
                // },
                // {
                // id: 44,
                // info: "京族",
                // },
                // {
                // id: 45,
                // info: "基诺族",
                // },
                // {
                // id: 46,
                // info: "德昂族",
                // },
                // {
                // id: 47,
                // info: "保安族",
                // },
                // {
                // id: 48,
                // info: "俄罗斯族",
                // },
                // {
                // id: 49,
                // info: "裕固族",
                // },
                // {
                // id: 50,
                // info: "乌孜别克族",
                // },
                // {
                // id: 51,
                // info: "门巴族",
                // },
                // {
                // id: 52,
                // info: "鄂伦春族",
                // },
                // {
                // id: 53,
                // info: "独龙族",
                // },
                // {
                // id: 54,
                // info: "塔塔尔族",
                // },
                // {
                // id: 55,
                // info: "赫哲族",
                // },
                // {
                // id: 56,
                // info: "珞巴族",
                // },
                // 版权声明：本文为CSDN博主「码农陈冠希」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
                // 原文链接：https://blog.csdn.net/qq_48895397/article/details/121249251
            ],
            id_types: [
                // {
                //     value: '1',
                //     label: '身份证',
                // },
                // {
                //     value: '2',
                //     label: '护照',
                // },
                // {
                //     value: '3',
                //     label: '军官证',
                // },
            ],
            professions: [
                // {
                //     value: '11',
                //     label: '国家公务员'
                // },
                // {
                //     value: '13',
                //     label: '专业技术人员'
                // },
                // {
                //     value: '17',
                //     label: '职员'
                // },
                // {
                //     value: '21',
                //     label: '企业管理人员'
                // },
                // {
                //     value: '24',
                //     label: '工人'
                // },
                // {
                //     value: '27',
                //     label: '农民'
                // },
                // {
                //     value: '31',
                //     label: '学生'
                // },
                // {
                //     value: '37',
                //     label: '现役军人'
                // },
                // {
                //     value: '51',
                //     label: '自由职业者'
                // },
                // {
                //     value: '54',
                //     label: '个体经营者'
                // },
                // {
                //     value: '70',
                //     label: '无业人员'
                // },
                // {
                //     value: '80',
                //     label: '退（离）修人员'
                // },
                // {
                //     value: '90',
                //     label: '其他'
                // },
            ],
            marriage_stats: [
                // {
                //     value: '1',
                //     label: '未婚'
                // },
                // {
                //     value: '2',
                //     label: '已婚'
                // },
                // {
                //     value: '3',
                //     label: '丧偶'
                // },
                // {
                //     value: '4',
                //     label: '离婚'
                // },
                // {
                //     value: '9',
                //     label: '其他'
                // },
            ],
            contact_relations: [
                // {
                //     value: '1',
                //     label: '配偶',
                //     disabled: true
                // },
                // {
                //     value: '2',
                //     label: '子'
                // },
                // {
                //     value: '3',
                //     label: '女'
                // },
                // {
                //     value: '4',
                //     label: '孙子，孙女或外孙子，外孙女'
                // },
                // {
                //     value: '5',
                //     label: '父母'
                // },
                // {
                //     value: '6',
                //     label: '祖父母或外祖父母'
                // },
                // {
                //     value: '8',
                //     label: '其他'
                // }
            ],
            admit_paths: [
                // {
                //     value: '1',
                //     label: '经由本院急诊、门诊诊疗后入院'
                // },
                // {
                //     value: '2',
                //     label: '经由其他医疗机构诊治后转诊入院'
                // },
                // {
                //     value: '3',
                //     label: '其他途径入院'
                // }
            ],
            // 待补充
            specialties: [
                // {
                //     value: '50',
                //     label: '中医科',
                //     children: [
                //         {
                //             value: '01',
                //             label: '内科专业',
                //             children: [
                //                 {
                //                     value: '01',
                //                     label: '肺病科专业'
                //                 },
                //                 {
                //                     value: '02',
                //                     label: '脾胃病科专业'
                //                 }
                //             ]
                //         }
                //     ]
                // },
                // {}
            ],
            ad_conditions: [
                // {
                //     value: '1',
                //     label: '有'
                // },
                // {
                //     value: '2',
                //     label: '临床未确定'
                // },
                // {
                //     value: '3',
                //     label: '情况不明'
                // },
                // {
                //     value: '4',
                //     label: '无'
                // }
            ],
            blood_groups: [
                // {
                //     value: '1',
                //     label: 'A'
                // },
                // {
                //     value: '2',
                //     label: 'B'
                // },
                // {
                //     value: '3',
                //     label: 'O'
                // },
                // {
                //     value: '4',
                //     label: 'AB'
                // },
                // {
                //     value: '5',
                //     label: '不详'
                // },
                // {
                //     value: '6',
                //     label: '未查'
                // },
            ],
            rhs: [
                // {
                //     value: '1',
                //     label: '阴'
                // },
                // {
                //     value: '2',
                //     label: '阳'
                // },
                // {
                //     value: '3',
                //     label: '不详'
                // },
                // {
                //     value: '4',
                //     label: '未查'
                // }
            ],
            record_qualities: [
                // {
                //     value: '1',
                //     label: '甲'
                // },
                // {
                //     value: '2',
                //     label: '乙'
                // },
                // {
                //     value: '3',
                //     label: '丙'
                // },
            ],
            op_lvls: [
                // {
                //     value: '1',
                //     label: '一级手术'
                // },
                // {
                //     value: '2',
                //     label: '二级手术'
                // },
                // {
                //     value: '3',
                //     label: '三级手术'
                // },
                // {
                //     value: '4',
                //     label: '四级手术'
                // },
            ],
            wh_lvls: [
                // {
                //     value: '0',
                //     label: '0类切口'
                // },
                // {
                //     value: '1',
                //     label: 'I类切口',
                //     children: [
                //         {
                //             value: '1',
                //             label: '甲'
                //         },
                //         {
                //             value: '2',
                //             label: '乙'
                //         },
                //         {
                //             value: '3',
                //             label: '丙'
                //         },
                //         {
                //             value: '4',
                //             label: '其他'
                //         }
                //     ]
                // },
                // {
                //     value: '2',
                //     label: 'II类切口',
                //     children: [
                //         {
                //             value: '1',
                //             label: '甲'
                //         },
                //         {
                //             value: '2',
                //             label: '乙'
                //         },
                //         {
                //             value: '3',
                //             label: '丙'
                //         },
                //         {
                //             value: '4',
                //             label: '其他'
                //         }
                //     ]
                // },
                // {
                //     value: '1',
                //     label: 'III类切口',
                //     children: [
                //         {
                //             value: '1',
                //             label: '甲'
                //         },
                //         {
                //             value: '2',
                //             label: '乙'
                //         },
                //         {
                //             value: '3',
                //             label: '丙'
                //         },
                //         {
                //             value: '4',
                //             label: '其他'
                //         }
                //     ]
                // }
            ],
            anaesthesia_types: [
                // {
                //     value: '1',
                //     label: '全麻'
                // },
                // {
                //     value: '2',
                //     label: '局麻'
                // },
                // {
                //     value: '3',
                //     label: '硬膜外麻'
                // },
            ],
            release_types: [
                // {
                //     value: '1',
                //     label: '医嘱离院'
                // },
                // {
                //     value: '2',
                //     label: '医嘱转院'
                // },
                // {
                //     value: '3',
                //     label: '医嘱转社区卫生服务机构/乡镇卫生院'
                // },
                // {
                //     value: '4',
                //     label: '非医嘱离院'
                // },
                // {
                //     value: '5',
                //     label: '死亡'
                // },
                // {
                //     value: '6',
                //     label: '其他'
                // },
            ]
        }
    },
    mounted() {
        document.title = '住院病案首页'
        this.loadStandard()
        this.getPage()
    },
    computed: {
        idNumVal: {
            get() {
                if(this.form.id_type===this.id_type_id_card)
                    return this.form.id_card_num
                else if(this.form.id_type===this.id_type_passport)
                    return this.form.passport_num
                else if(this.form.id_type===this.id_type_officer)
                    return this.form.officer_num
            },
            set(val) {
                if(this.form.id_type===this.id_type_id_card)
                    this.form.id_card_num = val
                else if(this.form.id_type===this.id_type_passport)
                    this.form.passport_num = val
                else if(this.form.id_type===this.id_type_officer)
                    this.form.officer_num = val
            }
        }
    },
    methods: {
        async queryDiag(query) {
            if(query) {
                this.diags_loading = true
                await axios
                    .get('/api/v1/query-diag/',{params:{query: query}})
                    .then(response=>{
                        console.log(response)
                        console.log(response.data.result)
                        this.temp_diags.length = 0
                        response.data.result.forEach(d => {
                            this.temp_diags.push(d)
                        });
                        this.diags_loading = false
                    })
                    .catch(error=>{
                        console.log(error)
                        // diags_loading.value = true
                    })
            } else {
                this.temp_diags = []
            }
        },
        async loadStandard() {
            await axios.get('/api/v1/get-standard/specialty')
                .then(response=>{
                    console.log('appliedspstd:',response)
                    this.specialties = response.data.specialties
                    console.log('current specialties:',this.specialties)
                })
                .catch(error=>{
                    console.log(error)
                })
            // purchase methods
            await axios.get('/api/v1/get-standard/gstd/',{params:{type:'PURCHASEMETHOD'}})
                    .then(response=>{
                        console.log('applied_purchase_methods:',response.data.generals)
                        response.data.generals.forEach(p => {
                            console.log('p:',p)
                            this.purchase_methods.push({value:p.code,label:p.label})
                            console.log('current purchase_methods:',this.purchase_methods)
                        });
                    })
                    .catch(error=>{
                        console.log(error)
                    })
            // genders
            await axios.get('/api/v1/get-standard/gstd/',{params:{type:'GENDER'}})
                    .then(response=>{
                        console.log('applied_gender:',response.data.generals)
                        response.data.generals.forEach(g => {
                            console.log('g:',g)
                            this.genders.push({value:g.code,label:g.label})
                            console.log('current genders:',this.genders)
                        });
                    })
                    .catch(error=>{
                        console.log(error)
                    })
            // nationalities
            await axios.get('/api/v1/get-standard/gstd/',{params:{type:'NATIONALITY'}})
                .then(response=>{
                    this.countries[0].options.length = 0 // 如果有china放到默认
                    this.countries[1].options.length = 0
                    console.log('applied_nationality:',response.data.generals)
                    response.data.generals.forEach(n=>{
                        console.log('n:',n)
                        this.countries[1].options.push({value:n.code,label:n.label})
                        if(n.label=='中国'){
                            this.countries[0].options.push({value:n.code,label:n.label})
                        }
                    })
                    // specialties.value = response.data.specialties
                    console.log('current nationalities:',this.countries)
                })
                .catch(error=>{
                    console.log(error)
                })
            // ethnicities
            await axios.get('/api/v1/get-standard/gstd/',{params:{type:'ETHNICITY'}})
                .then(response=>{
                    // ethnicities.length = 0
                    console.log('applied_nationality:',response.data.generals)
                    response.data.generals.forEach(e=>{
                        console.log('e:',e)
                        this.ethnicities.push({id:e.code,info:e.label})
                    })
                    // specialties.value = response.data.specialties
                    console.log('current ethnicities:',this.ethnicities)
                })
                .catch(error=>{
                    console.log(error)
                })
            // id types
            await axios.get('/api/v1/get-standard/gstd/',{params:{type:'IDTYPE'}})
                .then(response=>{
                    // id_types.length = 0
                    console.log('applied_id_types:',response.data.generals)
                    response.data.generals.forEach(i=>{
                        console.log('i:',i)
                        if(i.label=='身份证') this.id_type_id_card = i.code
                        if(i.label=='护照') this.id_type_passport = i.code
                        if(i.label=='军官证') this.id_type_officer = i.code
                        this.id_types.push({value:i.code,label:i.label})
                    })
                    // specialties.value = response.data.specialties
                    console.log('current id_types:',this.id_types)
                })
                .catch(error=>{
                    console.log(error)
                })
            // professions
            await axios.get('/api/v1/get-standard/gstd/',{params:{type:'PROFESSION'}})
                .then(response=>{
                    this.professions.length = 0
                    console.log('applied_professions:',response.data.generals)
                    response.data.generals.forEach(p=>{
                        console.log('p:',p)
                        this.professions.push({value:p.code,label:p.label})
                    })
                    // specialties.value = response.data.specialties
                    console.log('current professions:',this.professions)
                })
                .catch(error=>{
                    console.log(error)
                })
            // marriage stats
            await axios.get('/api/v1/get-standard/gstd/',{params:{type:'MARRIAGESTAT'}})
                .then(response=>{
                    console.log('applied_marriage_stats:',response.data.generals)
                    response.data.generals.forEach(p=>{
                        console.log('p:',p)
                        this.marriage_stats.push({value:p.code,label:p.label})
                        if(p.label==='已婚'){
                            this.marriage_stat_married = p.code
                        }
                    })
                    // specialties.value = response.data.specialties
                    console.log('current marriage_stats:',this.marriage_stats)
                })
                .catch(error=>{
                    console.log(error)
                })
            // contact_relations
            await axios.get('/api/v1/get-standard/gstd/',{params:{type:'CONTACTRELATION'}})
                .then(response=>{
                    console.log('applied_contact_relations:',response.data.generals)
                    response.data.generals.forEach(c=>{
                        console.log('c:',c)
                        if(c.label=='其他') {
                            this.contact_relation_other_value = c.code
                        }
                        if(c.label=='配偶') { // 标准会变，暂时用label来决定是否保留
                            this.contact_relation_partner_index = this.contact_relations.length
                            this.contact_relations.push({value:c.code,label:c.label,disabled:false})
                        } else {
                            this.contact_relations.push({value:c.code,label:c.label})
                        }
                    })
                    console.log('current contact_relations:',this.contact_relations)
                })
                .catch(error=>{
                    console.log(error)
                })
            // admit paths
            await axios.get('/api/v1/get-standard/gstd/',{params:{type:'ADMITPATH'}})
                .then(response=>{
                    console.log('applied_admit_paths:',response.data.generals)
                    response.data.generals.forEach(a=>{
                        console.log('a:',a)
                        this.admit_paths.push({value:a.code,label:a.label})
                    })
                    console.log('current admit_paths:',this.admit_paths)
                })
                .catch(error=>{
                    console.log(error)
                })
            // ad_condition
            await axios.get('/api/v1/get-standard/gstd/',{params:{type:'ADMITCONDITION'}})
                .then(response=>{
                    console.log('applied_ad_conditions:',response.data.generals)
                    response.data.generals.forEach(a=>{
                        console.log('a:',a)
                        this.ad_conditions.push({value:a.code,label:a.label})
                    })
                    console.log('current ad_conditions:',this.ad_conditions)
                })
                .catch(error=>{
                    console.log(error)
                })
            // blood_groups
            await axios.get('/api/v1/get-standard/gstd/',{params:{type:'BLOODGROUP'}})
                .then(response=>{
                    console.log('applied_blood_group:',response.data.generals)
                    response.data.generals.forEach(b=>{
                        console.log('b:',b)
                        this.blood_groups.push({value:b.code,label:b.label})
                    })
                    console.log('current blood_groups:',this.blood_groups)
                })
                .catch(error=>{
                    console.log(error)
                })
            // rhs
            await axios.get('/api/v1/get-standard/gstd/',{params:{type:'RH'}})
                .then(response=>{
                    console.log('applied_rhs:',response.data.generals)
                    response.data.generals.forEach(r=>{
                        console.log('r:',r)
                        this.rhs.push({value:r.code,label:r.label})
                    })
                    console.log('current rhs:',this.rhs)
                })
                .catch(error=>{
                    console.log(error)
                })
            // record_qualities
            await axios.get('/api/v1/get-standard/gstd/',{params:{type:'RECORDQUALITY'}})
                .then(response=>{
                    console.log('record_qualities:',response.data.generals)
                    response.data.generals.forEach(r=>{
                        console.log('r:',r)
                        this.record_qualities.push({value:r.code,label:r.label})
                    })
                    console.log('current record_qualities:',this.record_qualities)
                })
                .catch(error=>{
                    console.log(error)
                })
            // op_lvls
            await axios.get('/api/v1/get-standard/gstd/',{params:{type:'OPLVL'}})
                .then(response=>{
                    console.log('op_lvls:',response.data.generals)
                    response.data.generals.forEach(o=>{
                        console.log('o:',o)
                        this.op_lvls.push({value:o.code,label:o.label})
                    })
                    console.log('current op_lvls:',this.op_lvls)
                })
                .catch(error=>{
                    console.log(error)
                })
            // wound_healing_lvl need to change model to 2 layers
            await axios.get('/api/v1/get-standard/g2std/',{params:{type:'WOUNDHEALINGLVL'}})
                .then(response=>{
                    console.log('wh_lvls:',response.data.general1)
                    response.data.general1.forEach(w=>{
                        console.log('w:',w)
                        this.wh_lvls.push(w)
                    })
                    console.log('current wh_lvls:',this.wh_lvls)
                })
                .catch(error=>{
                    console.log(error)
                })
            // anaesthesia_types
            await axios.get('/api/v1/get-standard/gstd/',{params:{type:'ANAESTHESIATYPE'}})
                .then(response=>{
                    console.log('applied_anaesthesia_types:',response.data.generals)
                    response.data.generals.forEach(a=>{
                        console.log('a:',a)
                        this.anaesthesia_types.push({value:a.code,label:a.label})
                    })
                    console.log('current anaesthesia_types:',this.anaesthesia_types)
                })
                .catch(error=>{
                    console.log(error)
                })
            // release_types
            await axios.get('/api/v1/get-standard/gstd/',{params:{type:'RELEASETYPE'}})
                .then(response=>{
                    console.log('applied_release_types:',response.data.generals)
                    response.data.generals.forEach(r=>{
                        console.log('r:',r)
                        this.release_types.push({value:r.code,label:r.label})
                        if(r.label==='医嘱转院'){
                            this.release_type_trans_2=r.code
                        } else if(r.label==='医嘱转社区卫生服务机构/乡镇卫生院'){
                            this.release_type_trans_3=r.code
                        }
                        console.log('release_type_trans_2:',this.release_type_trans_2)
                        console.log('release_type_trans_3:',this.release_type_trans_3)
                    })
                    console.log('current release_types:',this.release_types)
                })
                .catch(error=>{
                    console.log(error)
                })
        },
        async getPage() {
            // const route = useRoute()
            // const id = route.params.id
            const id = this.$route.params.id
            console.log('id:',id)
            await axios
                .get('/api/v1/view-homepage/',{params:{id:id}})
                .then(response=>{
                    console.log(response)
                    this.form = response.data.homepage
                    console.log('head_injury_check',this.form.head_injury_check)
                    console.log('head_injury_check',response.data.homepage.head_injury_check)
                    console.log('form:')
                    console.log(this.form)
                    console.log(this.form.release_specialty)
                }).catch(error=>{
                    console.log(error)
                })
        },
        presentAddrOnChange(val) {
            console.log(val)
            // this.form.present_zip = val[val.length-1]
            // console.log(this.form.present_zip)
        },
        async updateForm() {
            console.log('updating...')
            
            const formData = this.form
            // formData.birthplace = this.getPlaceText(formData.birthplace)
            // formData.parent_birthplace = this.getPlaceText(formData.parent_birthplace)
            // formData.present_addr1 = this.getPlaceText(formData.present_addr1)
            // formData.registered_addr1 = this.getPlaceText(formData.registered_addr1)
            // formData.work_addr1 = this.getPlaceText(formData.work_addr1)
            // formData.contact_addr1 = this.getPlaceText(formData.contact_addr1)
            console.log(formData)
            console.log('这里开始')
            console.log(this.form.id_type)
            // 检验
            if(this.form.id_type==='1'&&!validate(this.form.id_card_num)) {
                console.log(this.form.id_card_num)
                console.log('兄弟你这个身份证号不太对啊')
                ElMessage({
                    showClose: true,
                    message: '兄弟你这个身份证号不太对啊!',
                    type: 'error',
                    duration: 10000
                })
            } else {
                // 上传
                await axios
                    .post('/api/v1/update-homepage/',{'form':formData})
                    .then(response=>{
                        console.log('submitted and got response:')
                        console.log(response)
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                console.log('应该跳转了')
                // this.$router.replace('/success')
                this.$router.push('/success')
            }
        },
        cancelForm() {
            this.$router.push('/')
        },
        marriageOnChange(val) {
            console.log('婚姻状态')
            console.log(val)
            if(val===this.marriage_stat_married) {
                console.log('contact_relation_partner_index:',this.contact_relation_partner_index)
                this.contact_relations[this.contact_relation_partner_index].disabled=false
            } else {
                console.log('contact_relation_partner_index:',this.contact_relation_partner_index)
                this.contact_relations[this.contact_relation_partner_index].disabled=true
                this.form.contact_relation=''
            }
        },
        birthOrAdmitdayOnChange() {
            if(!this.form.birthday)
                this.form.birthday = ''
            if(!this.form.admit_time)
                this.form.admit_time = ''
            if(this.form.birthday!=='' && this.form.admit_time!=='') {
                console.log('入院：'+this.form.admit_time)
                console.log('生日：'+this.form.birthday)
                let birthday = this.form.birthday
                let admitday = this.form.admit_time.split(' ')[0]
                if(birthday===admitday) {
                    this.form.age = '第0天'
                } else {
                    console.log(birthday, admitday)
                    // 计算年龄
                    let age = new calculateAge(birthday, admitday)
                    console.log(age.getString())
                    age = age.getObject()
                    this.form.newborn_check = false
                    if(age.years < 1) {
                        if(age.days <= 28 && age.months<1) {
                            this.form.newborn_check = true
                        }
                        this.form.age = age.months.toString()+' '+age.days.toString()+'/30月'
                    } else {
                        this.form.age = age.years.toString()
                    }
                }
            } else {
                this.form.age = '请先输入其他信息'
            }
            console.log('age - this.form.age')
        },
        admitOrReleasedayOnChange() {
            if(!this.form.admit_time)
                this.form.admit_time = ''
            if(!this.form.release_time)
                this.form.release_time = ''
            if(this.form.admit_time!=='' && this.form.release_time!=='') {
                console.log('入院：'+this.form.admit_time)
                console.log('出院：'+this.form.release_time)
                let admitday = this.form.admit_time.split(' ')[0]
                let releaseday = this.form.release_time.split(' ')[0]
                console.log(admitday, releaseday)
                // 计算住院时间
                if(admitday===releaseday) {
                    this.form.hosp_duration=1
                } else {
                    let ad = new Date(admitday)
                    let rd = new Date(releaseday)
                    let duration = rd.getTime() - ad.getTime()
                    duration = parseInt(duration/(1000*60*60*24))
                    console.log(duration)
                    this.form.hosp_duration = duration
                }                
            } else {
                this.form.hosp_duration = -1
            }
        },
        nationalityOnChange(val) {
            console.log(val)
            if(this.form.nationality!=='中国') {
                console.log('this damn ass is not a Chinese')
                this.form.birthplace = ['000000']
                this.form.parent_birthplace = ['000000']
            }
        },
        getPlaceText(val) {
            // console.log('getting place text')
            // console.log(val[0])
            if(val[0]==='000000')
                return '其他'
            let loc = '';
            for (let i = 0; i < val.length; i++) {
                loc += CodeToText[val[i]]+'/';
            }
            return loc.substr(0,loc.length-1)
        },
        disabledDate0(time) {
            let return_val = time.getTime() > Date.now()
            if (this.form.admit_time) {
                let admit_nums = this.form.admit_time.split(' ')[0].split('-')
                // console.log(admit_nums)
                let admitday=new Date()
                admitday.setFullYear(parseInt(admit_nums[0]), parseInt(admit_nums[1])-1, parseInt(admit_nums[2]))
                return_val = return_val || time.getTime() > admitday
            }
            if (this.form.release_time) {
                let release_nums = this.form.release_time.split(' ')[0].split('-')
                // console.log(admit_nums)
                let releaseday=new Date()
                releaseday.setFullYear(parseInt(release_nums[0]), parseInt(release_nums[1])-1, parseInt(release_nums[2]))
                return_val = return_val || time.getTime() > releaseday
            }
            console.log('disableDate0 finish')
            return return_val
        },
        disabledDate1(time) {
            let return_val = time.getTime() > Date.now()
            if (this.form.birthday) {
                let birth_nums = this.form.birthday.split('-')
                // console.log(birth_nums)
                let birthday=new Date()
                birthday.setFullYear(parseInt(birth_nums[0]), parseInt(birth_nums[1])-1, parseInt(birth_nums[2])-1)
                return_val = return_val || time.getTime() < birthday //birthday?
            }
            if (this.form.release_time) {
                let release_nums = this.form.release_time.split(' ')[0].split('-')
                // console.log(admit_nums)
                let releaseday=new Date()
                releaseday.setFullYear(parseInt(release_nums[0]), parseInt(release_nums[1])-1, parseInt(release_nums[2]))
                return_val = return_val || time.getTime() > releaseday
            }
            return return_val
        },
        disabledDate2(time) {
            let return_val = time.getTime() > Date.now()
            if (this.form.birthday) {
                let birth_nums = this.form.birthday.split('-')
                // console.log(birth_nums)
                let birthday=new Date()
                birthday.setFullYear(parseInt(birth_nums[0]), parseInt(birth_nums[1])-1, parseInt(birth_nums[2])-1)
                return_val = return_val || time.getTime() < birthday //birthday?
            }
            if (this.form.admit_time) {
                let admit_nums = this.form.admit_time.split(' ')[0].split('-')
                // console.log(birth_nums)
                let admitday=new Date()
                admitday.setFullYear(parseInt(admit_nums[0]), parseInt(admit_nums[1])-1, parseInt(admit_nums[2])-1)
                return_val = return_val || time.getTime() < admitday
            }
            return return_val
        },
        getHospDuration() {
            if(this.form.hosp_duration<0)
                return '请输入入院和出院时间'
            else
                return this.form.hosp_duration
        },
        addDiag(diag) {
            this.form.other_diags.push({
                release: '',
                code: '',
                condition: '',
                key: Date.now(),
            })
        },
        removeDiag(diag) {
            let index = this.form.other_diags.indexOf(diag)
            if(index != -1) {
                this.form.other_diags.splice(index, 1)
            }
        },
        addOp(op) {
            this.form.ops.push({
                code: '',
                date: '',
                level: '',
                name: '',
                operator: '',
                assis1: '',
                assis2: '',
                wound_healing_lvl: [],
                anaesthesia_type: '',
                anaesthetist: '',
                key: Date.now(),
            })
        },
        removeOp(op) {
            let index = this.form.ops.indexOf(op)
            if(index != -1) {
                this.form.ops.splice(index, 1)
            }
        }
    }
}
</script>
<style>
.edit:hover {
    background-color:#a84f4f !important;
    border: 1px solid rgb(168, 79, 79) !important;
}
.view:hover {
    background-color:#008585 !important;
    border: 1px solid rgb(0, 133, 133) !important;
}
.el-switch__core {
    height: 100% !important;
    border-radius: 0% !important;
}
.el-switch__core .el-switch__action {
    height: 90% !important;
    border-radius: 0% !important;
}
.is-text {
    /* height: 2rem !important; */
    padding-bottom: 3px !important;
    font-size: .9rem !important;
}
.el-switch__inner {
    height: 100% !important;
    font-size: var(--el-font-size-base,14px) !important;
}
.el-button.is-disabled:hover {
    background-color: rgb(255, 255, 255) !important;
    border:1px solid rgb(228, 228, 228) !important;
    color: rgb(77, 77, 77) !important;
}
.el-button.add-op.is-disabled:hover {
    color: #4d4d4d !important;
    border: 1px solid rgb(219, 219, 219) !important;
    background-color: rgb(255, 255, 255) !important;
}
.el-button.add-diag.is-disabled:hover {
    color: #4d4d4d !important;
    border: 1px solid rgb(219, 219, 219) !important;
    background-color: rgb(255, 255, 255) !important;
}
.el-button.remove-op.is-disabled:hover {
    color: black !important;
    border: 1px solid rgb(219, 219, 219) !important;
    background-color: rgb(219, 219, 219) !important;
}
.el-button.remove-diag.is-disabled:hover {
    color: black !important;
    border: 1px solid rgb(219, 219, 219) !important;
    background-color: rgb(219, 219, 219) !important;
}
.el-input.is-disabled .el-input__inner {
    color: #1a1a1a !important;
    background-color:#f8f8f8 !important;
}
.el-textarea.is-disabled .el-textarea__inner {
    color: #1a1a1a !important;
    background-color:#f8f8f8 !important;
}
</style>