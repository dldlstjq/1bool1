/* eslint-disable no-unused-vars */
import { Grid } from '@mui/material';
import { width } from '@mui/system';
function Upper({ nickname, password, description, minute, star, title }) {
  return (
    <>
      {/* <h1 className="text-4xl font-bold text-center my-8">
        레시피 등록
      </h1> */}
      <div className="grid gap-6 border-b p-4 rounded" style={{backgroundColor:'#ffe2e180'}}>
        <Grid container spacing={3}>
          <Grid item md = {9} xs={9} container spacing={3}>
            <Grid item md = {3} xs={4} >
              <p>닉네임</p>
            </Grid>
            <Grid item md = {9} xs={8}>
              <input
                type="text"
                name="nickname"
                defaultValue={nickname}
                required
                placeholder="닉네임"
                className=" h-10 rounded w-2/3"
              />
            </Grid>
            <br></br>
            <Grid item md = {3} xs={4}>
              <p>비밀번호</p>
            </Grid>
            <Grid item md = {9} xs={8}>
              <input
              type="password"
              name="password"
              defaultValue={password}
              className=" h-10 rounded w-2/3"
              placeholder="비밀번호"
              required
            />
            </Grid>
            <br></br>
            <Grid item xs={12}>
            <input
              type="text"
              className=" h-10 rounded col-span-2 w-full"
              placeholder="레시피 제목"
              name="title"
              defaultValue={title}
              required
            />
            </Grid>
            <br></br>
            <Grid item xs={12}>
            <textarea
              name="description"
              className=" h-20 rounded col-span-2 w-full"
              placeholder="요리소개"
              defaultValue={description}
            ></textarea>
            </Grid>
            <br></br>
            <Grid item xs={12}>
            <input
              type="text"
              className=" h-10 rounded w-full"
              placeholder="요리시간(분)"
              name="minute"
              defaultValue={minute}
            />
            </Grid>
          </Grid>
          <Grid item md = {3} xs={3} >
              <div>
                <span className="text-lg">메인사진 &nbsp;</span>
                <input type="file" name="file" required className="inline-block"/>
              </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
export default Upper;
