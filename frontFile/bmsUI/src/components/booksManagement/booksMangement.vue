<template>
    <div id="bookManagement" class="clearfix">
         <div id="header">
            <span>图书管理</span>
        </div>
        <div class="book-management-sreach">
            <Sreach v-model="searchValue" @getSearchList="getSeachList"></Sreach>
            <div class="add-book-btn">
                <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增书籍</el-button>
            </div>
        </div>
        <div class="book-management-table">
            <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            style="width: 100%"
            :header-cell-style="{background:'#66b1ff',color:'#fff'}" 
            stripe   
            highlight-current-row
        >
                <el-table-column
                    prop="id"
                    label="图书编号"
                    align="center"
                    width="100px"
                >
                </el-table-column>
                <el-table-column
                    prop="bookName"
                    label="图书名称"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="author"
                    label="作者"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="category"
                    label="图书类别"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="press"
                    label="出版社"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="bookNumber"
                    label="图书数量"
                    align="center"
                >
                </el-table-column>
                <el-table-column 
                    label="操作"
                    align="center"
                >
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    

                </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
               <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    background
                    :page-size="pagesize"  
                    layout="total, prev, pager, next"
                    :total="tableData.length"
                ></el-pagination>
            </div>
        </div>

        <!-- 增加书籍模态框 -->
        <el-dialog title="添加书籍" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="书籍编号" prop="id">
                    <el-input v-model.trim="ruleForm.id" clearable></el-input>
                </el-form-item>
                <el-form-item label="书籍名称" prop="bookName">
                    <el-input v-model.trim="ruleForm.bookName" clearable></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="author">
                    <el-input v-model.trim="ruleForm.author" clearable></el-input>
                </el-form-item>
                <el-form-item label="书籍类别" prop="category">
                    <el-select v-model="ruleForm.category" placeholder="请选择书籍区域">
                        <el-option label="教育" value="教育"></el-option>
                        <el-option label="文学" value="文学"></el-option>
                        <el-option label="幼儿" value="幼儿"></el-option>
                        <el-option label="历史" value="历史"></el-option>
                        <el-option label="青春" value="青春"></el-option>
                        <el-option label="恐怖" value="恐怖"></el-option>
                        <el-option label="玄幻" value="玄幻"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出版社" prop="press">
                    <el-input v-model.trim="ruleForm.press" clearable></el-input>
                </el-form-item>
                <el-form-item label="图书数量" prop="bookNumber">
                    <el-input-number v-model="ruleForm.bookNumber" :min="1"  label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="书籍简介" prop="introduction">
                    <el-input type="textarea" v-model.trim="ruleForm.introduction" clearable></el-input>
                </el-form-item>
                <!-- <el-form-item label="书籍图片" prop="img">
                   <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">添加图书</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 编辑信息 -->
            <el-dialog title="编辑书籍" :visible.sync="dialogFormEditVisible">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                     <el-form-item label="书籍编号" prop="id">
                        <el-input v-model.trim="ruleForm.id" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="书籍名称" prop="bookName">
                        <el-input v-model.trim="ruleForm.bookName" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="书籍类别" prop="category">
                        <el-select v-model="ruleForm.category" placeholder="请选择书籍区域">
                            <el-option label="教育" value="教育"></el-option>
                            <el-option label="文学" value="文学"></el-option>
                            <el-option label="幼儿" value="幼儿"></el-option>
                            <el-option label="历史" value="历史"></el-option>
                            <el-option label="青春" value="青春"></el-option>
                            <el-option label="恐怖" value="恐怖"></el-option>
                            <el-option label="玄幻" value="玄幻"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出版社" prop="press">
                        <el-input v-model.trim="ruleForm.press" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="图书数量" prop="bookNumber">
                        <el-input-number v-model="ruleForm.bookNumber" :min="1"  label="描述文字"></el-input-number>
                    </el-form-item>
                    <el-form-item label="书籍简介" prop="introduction">
                        <el-input type="textarea" v-model.trim="ruleForm.introduction" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitEditForm('ruleForm')">提交编辑</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
    </div>
</template>

<script src="./booksMangement.js"></script>

<style scoped>
 @import './booksMangement';
</style>
