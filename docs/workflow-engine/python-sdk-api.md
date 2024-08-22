---
sidebar_position: 3
---

# 📙 Python API

```python

    @property
    def keepAlive(self):
        return self.__keep_alive

    @property
    def inputs(self):
        return self.__inputs

    @property
    def session_id(self):
        return self.__block_info.session_id

    @property
    def job_id(self):
        return self.__block_info.job_id
    
    @property
    def job_info(self) -> JobDict:
        return self.__block_info.job_info()
    
    @property
    def block_info(self) -> BlockDict:
        return self.__block_info.block_dict()
    
    @property
    def node_id(self) -> str:
        return self.__block_info.stacks[-1].get("node_id", None)

    def __store_ref(self, handle: str):
        return StoreKey(
            executor=EXECUTOR_NAME,
            handle=handle,
            job_id=self.job_id,
            session_id=self.session_id,
        )
    
    def __is_basic_type(self, value: Any) -> bool:
        return isinstance(value, (int, float, str, bool))

    def output(self, output, handle: str, done: bool = False):

        v = output

        if self.__outputs_def is not None:
            output_def = self.__outputs_def.get(handle)
            if (
                output_def is not None and output_def.is_var_handle() and not self.__is_basic_type(output) # 基础类型即使是变量也不放进 store，直接作为 json 内容传递
            ):
                ref = self.__store_ref(handle)
                self.__store[ref] = output
                v = asdict(ref)

        if self.__outputs_def is not None and self.__outputs_def.get(handle) is None:
            # TODO: 未来添加 warning 级别日志时，更改为 warning 而不是 error
            self.send_error(
                f"Output handle key: [{handle}] is not defined in Block outputs schema."
            )

        node_result = {
            "type": "BlockOutput",
            "handle": handle,
            "output": v,
            "done": done,
        }
        self.__mainframe.send(self.job_info, node_result)

        if done:
            self.done()

    def done(self, error: str | None = None):
        if self.__is_done:
            # TODO: 添加 warning 日志，提示重复报错
            return
        self.__is_done = True
        if error is None:
            self.__mainframe.send(self.job_info, {"type": "BlockFinished"})
        else:
            self.__mainframe.send(
                self.job_info, {"type": "BlockFinished", "error": error}
            )

    def send_message(self, payload):
        self.__mainframe.report(
            self.block_info,
            {
                "type": "BlockMessage",
                "payload": payload,
            },
        )
    
    def __dataframe(self, payload: PreviewPayload) -> PreviewPayload:
        # payload is a dataframe
        if hasattr(payload, "__dataframe__") and hasattr(payload, "to_dict"):
            payload = { "type": "table", "data": payload }

        if isinstance(payload, dict) and payload.get("type") is not None and payload["type"] == "table":
            df: Any = payload.get("data")
            if hasattr(df, "__dataframe__") and hasattr(df, "to_dict"):
                row_count = df.shape[0]
                if row_count <= 10:
                    data = df.to_dict(orient='split')
                    columns = data.get("columns", [])
                    rows = data.get("data", [])
                else:
                    data_columns = loads(df.head(5).to_json(orient='split'))
                    columns = data_columns.get("columns", [])
                    rows_head = data_columns.get("data", [])
                    data_tail = loads(df.tail(5).to_json(orient='split'))
                    rows_tail = data_tail.get("data", [])
                    rows_dots = [["..."] * len(columns)]
                    rows = rows_head + rows_dots + rows_tail
                payload["data"] = { "rows": rows, "columns": columns, "row_count": row_count }
        
        return payload

    def __matplotlib(self, payload: PreviewPayload) -> PreviewPayload:
        # payload is a matplotlib Figure
        if hasattr(payload, 'savefig'):
            fig: Any = payload
            buffer = BytesIO()
            fig.savefig(buffer, format='png')
            buffer.seek(0)
            png = buffer.getvalue()
            buffer.close()
            url = f'data:image/png;base64,{b64encode(png).decode('utf-8')}'
            payload = { "type": "image", "data": url }

        return payload

    def preview(self, payload: PreviewPayload):
        payload = self.__dataframe(payload)
        payload = self.__matplotlib(payload)

        self.__mainframe.report(
            self.block_info,
            {
                "type": "BlockPreview",
                "payload": payload,
            },
        )


    def report_progress(self, progress: float | int):
        """report progress

        This api is used to report the progress of the block. but it just effect the ui progress not the real progress.

        :param float | int progress: the progress of the block, the value should be in [0, 100].
        """
        self.__mainframe.report(
            self.block_info,
            {
                "type": "BlockProgress",
                "rate": progress,
            }
        )

    def report_log(self, line: str, stdio: str = "stdout"):
        self.__mainframe.report(
            self.block_info,
            {
                "type": "BlockLog",
                "log": line,
                stdio: stdio,
            },
        )

    def log_json(self, payload):
        self.__mainframe.report(
            self.block_info,
            {
                "type": "BlockLogJSON",
                "json": payload,
            },
        )

    def send_error(self, error: str):
        self.__mainframe.send(self.job_info, {"type": "BlockError", "error": error})


```
